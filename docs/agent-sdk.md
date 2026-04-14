# Agent Wallet SDK

**PROXY Protocol — Agent SDK Specification**

> Version: 0.1 (Alpha Spec) · Status: Pre-release

---

## Overview

The PROXY Agent Wallet SDK enables any autonomous AI agent to initialise a wallet, manage $PROXY, and procure resources from the PROXY marketplace — without human involvement at any stage.

The SDK is designed to be:

- **Framework-agnostic** — works with LangChain, AutoGPT, CrewAI, and any custom agent implementation
- **Minimal** — four core methods, simple integration
- **Non-custodial** — the agent controls its own key material post-deployment
- **Anonymous by default** — no identity information required or transmitted

> **Status:** This document is the pre-release specification. SDK implementation begins at Phase 2 (Testnet). This spec is published to enable the community to review design decisions and provide feedback before build.

---

## Installation

```bash
# npm
npm install @proxy-protocol/agent-sdk

# yarn
yarn add @proxy-protocol/agent-sdk
```

---

## Quick Start

```javascript
import { ProxyAgent } from '@proxy-protocol/agent-sdk';

// Initialise agent wallet
const agent = await ProxyAgent.init({
  network: 'base-mainnet',
  fundingAmount: '500', // $PROXY
});

// Request inference
const result = await agent.request({
  type: 'inference',
  model: 'llama-3.3-70b-instruct',
  prompt: 'Summarise the following document...',
  budgetCeiling: '12.50', // $PROXY
  maxLatencyMs: 800,
});

console.log(result.output);
console.log(result.proofHash);
console.log(result.settled); // true
```

---

## Core API

### `ProxyAgent.init(config)`

Initialises a new agent wallet on Base. Creates a non-custodial ERC-20 wallet, funds it with the specified $PROXY amount, and registers the agent on the PROXY network.

```typescript
interface InitConfig {
  network: 'base-mainnet' | 'base-sepolia';
  fundingAmount: string;        // $PROXY amount as string
  operatorKey?: string;         // Optional: operator private key for funding tx
  budgetAlerts?: {
    threshold: string;          // Alert when balance falls below this amount
    callback: (balance: string) => void;
  };
}

const agent = await ProxyAgent.init(config): Promise<ProxyAgent>
```

---

### `agent.request(params)`

Broadcasts a signed `AgentRequest` to the PROXY routing layer, escrows the budget ceiling, and returns the fulfilled resource upon proof verification.

```typescript
interface RequestParams {
  type: ResourceType;           // 'inference' | 'data' | 'api' | 'storage' | 'bandwidth'
  budgetCeiling: string;        // Maximum $PROXY to spend
  maxLatencyMs?: number;        // Maximum acceptable latency (default: 2000)

  // Inference-specific
  model?: string;               // e.g. 'llama-3.3-70b-instruct'
  prompt?: string;
  maxTokens?: number;

  // Data-specific
  feed?: string;                // e.g. 'chainlink/ETH-USD'
  windowMs?: number;

  // API-specific
  endpoint?: string;
  method?: 'GET' | 'POST';
  payload?: object;

  // Storage-specific
  operation?: 'store' | 'retrieve';
  data?: string | Buffer;
  cid?: string;                 // For retrieval
}

interface RequestResult {
  jobId: string;
  output: any;                  // Resource-specific response
  proofHash: string;            // On-chain proof hash
  amountSpent: string;          // Actual $PROXY spent
  latencyMs: number;
  settled: boolean;
  txHash: string;               // Base transaction hash
}

const result = await agent.request(params): Promise<RequestResult>
```

---

### `agent.balance()`

Returns the current $PROXY balance of the agent wallet.

```typescript
const balance = await agent.balance(): Promise<string>
// Returns: '427.82'
```

---

### `agent.verify(proofHash)`

Verifies a specific delivery proof on-chain. Useful for auditing past transactions.

```typescript
const proof = await agent.verify(proofHash): Promise<ProofRecord>

interface ProofRecord {
  jobId: string;
  resourceType: string;
  outputHash: string;
  timestamp: number;
  valid: boolean;
  txHash: string;
}
```

---

## Framework Integration Examples

### LangChain

```python
from proxy_protocol import ProxyAgent
from langchain.tools import Tool

agent = ProxyAgent.init(network="base-mainnet", funding_amount="500")

proxy_inference = Tool(
    name="proxy_inference",
    description="Run inference on any open-weight model via PROXY network",
    func=lambda prompt: agent.request(
        type="inference",
        model="llama-3.3-70b-instruct",
        prompt=prompt,
        budget_ceiling="20.00"
    ).output
)
```

### AutoGPT

```python
from proxy_protocol import ProxyAgent

class ProxyInferenceTool:
    def __init__(self):
        self.agent = ProxyAgent.init(
            network="base-mainnet",
            funding_amount="1000"
        )

    def run(self, prompt: str) -> str:
        result = self.agent.request(
            type="inference",
            model="mixtral-8x7b-instruct",
            prompt=prompt,
            budget_ceiling="15.00"
        )
        return result.output
```

---

## Budget Management

Agents manage their own $PROXY budget autonomously. Best practices:

```javascript
// Set up low-balance alert
const agent = await ProxyAgent.init({
  network: 'base-mainnet',
  fundingAmount: '1000',
  budgetAlerts: {
    threshold: '50', // Alert when below 50 $PROXY
    callback: (balance) => {
      // Notify operator to top up
      console.log(`Agent balance low: ${balance} $PROXY`);
    }
  }
});

// Check balance before expensive operations
const balance = await agent.balance();
if (parseFloat(balance) < 100) {
  throw new Error('Insufficient $PROXY balance');
}
```

---

## Error Handling

```javascript
try {
  const result = await agent.request({ ... });
} catch (error) {
  switch (error.code) {
    case 'INSUFFICIENT_BALANCE':
      // Agent wallet needs topping up
      break;
    case 'PROOF_FAILED':
      // Delivery proof invalid — escrow refunded
      break;
    case 'NO_PROVIDER':
      // No eligible provider matched — try again or adjust params
      break;
    case 'LATENCY_EXCEEDED':
      // Provider exceeded latency SLA — partial refund applied
      break;
    case 'DISPUTE_OPENED':
      // Dispute in progress — await resolution
      break;
  }
}
```

---

## Supported Models (Inference)

| Model | Provider | Context | Cost/1K tokens |
|-------|----------|---------|----------------|
| llama-3.3-70b-instruct | Meta | 128K | ~0.08 $PROXY |
| llama-3.1-8b-instruct | Meta | 128K | ~0.02 $PROXY |
| mistral-7b-instruct-v0.3 | Mistral AI | 32K | ~0.02 $PROXY |
| mixtral-8x7b-instruct | Mistral AI | 32K | ~0.06 $PROXY |
| qwen2.5-72b-instruct | Alibaba | 128K | ~0.07 $PROXY |
| deepseek-r1-distill-llama-70b | DeepSeek | 64K | ~0.08 $PROXY |

*Pricing is indicative. Actual cost set by providers in marketplace.*

---

## Changelog

| Version | Date | Notes |
|---------|------|-------|
| 0.1 | 2026 | Pre-release specification published |
| 0.2 | TBA | Alpha SDK release (Testnet) |
| 1.0 | TBA | Production release (Mainnet) |

---

*See also: [`docs/architecture.md`](architecture.md) · [`docs/token.md`](token.md) · [Whitepaper](https://proxyprotocol.org/whitepaper)*
