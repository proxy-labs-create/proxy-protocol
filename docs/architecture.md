# Protocol Architecture

**PROXY Protocol — Technical Architecture Specification**

> Version: 1.0 · 2026

---

## Overview

The PROXY protocol is composed of four discrete layers, each responsible for a distinct function in the transaction lifecycle. Together they form a complete, trustless pipeline from resource request to verified settlement.

Every component is designed around a single constraint: **at no point should a human be required to participate in a transaction between an agent and a resource provider.**

---

## Layer 1 — Agent Wallet SDK

The Agent Wallet SDK is the entry point for any autonomous agent joining the PROXY network.

### Responsibilities

- Initialise a non-custodial ERC-20 wallet on Base for the agent
- Manage $PROXY balance autonomously post-initialisation
- Construct and sign `AgentRequest` objects
- Handle proof verification callbacks
- Monitor budget and alert operator when balance falls below threshold

### Key Design Principles

- **Non-custodial** — the agent controls its own private key post-deployment
- **Framework-agnostic** — compatible with LangChain, AutoGPT, CrewAI, and any custom agent implementation
- **Minimal surface area** — the SDK exposes four primary methods: `init()`, `request()`, `verify()`, `balance()`

### AgentRequest Schema

```json
{
  "agent_id": "0x4f2a...c91b",
  "resource_type": "inference | data | api | storage | bandwidth | agent",
  "parameters": {
    "model": "llama-3.3-70b-instruct",
    "prompt_tokens": 2048,
    "max_completion_tokens": 512
  },
  "budget_ceiling": "48.50",
  "max_latency_ms": 800,
  "timestamp": 1714000000,
  "signature": "0x..."
}
```

---

## Layer 2 — Request & Routing Layer

The routing layer receives broadcast `AgentRequest` objects and matches them to eligible providers.

### Matching Algorithm

Providers are scored against each incoming request using a weighted function:

```
score(provider) = w1 * stake_weight
               + w2 * latency_score
               + w3 * reliability_score
               + w4 * availability_score
```

Where weights are governance-controlled parameters adjustable via DAO vote.

### Anonymity Enforcement

The routing layer enforces anonymity for both parties through zero-knowledge attestations:

- **Agent anonymity** — the agent's wallet address is known to the protocol but not published to the matched provider
- **Provider anonymity** — the provider's infrastructure details, geographic location, and wallet address are not exposed to the requesting agent
- **Request privacy** — job parameters are hashed before broadcast; full parameters are only shared with the matched provider under encrypted channel

### Dispute Routing

Failed or contested deliveries are flagged by the proof layer and routed to the on-chain dispute resolution mechanism with a 300-second arbitration window.

---

## Layer 3 — Escrow Smart Contracts

All payment flows through PROXY's escrow smart contracts deployed on Base.

### Contract Functions

```
createEscrow(agentId, providerId, amount, jobHash) → escrowId
releaseEscrow(escrowId, deliveryProof) → settlement
disputeEscrow(escrowId, reason) → disputeId
slashProvider(providerId, amount, reason) → slashTx
```

### Escrow Lifecycle

```
REQUEST BROADCAST
      ↓
ESCROW CREATED (budget ceiling locked)
      ↓
JOB MATCHED & DISPATCHED
      ↓
DELIVERY PROOF SUBMITTED
      ↓
PROOF VALID?
  ├── YES → ESCROW RELEASED → provider receives $PROXY
  └── NO  → DISPUTE WINDOW OPENS (300s)
              ├── RESOLVED → partial release or full refund
              └── UNRESOLVED → DAO arbitration
```

### Security Properties

- Contracts are **non-upgradeable post-audit** to eliminate admin key risk
- Budget ceiling is **atomically escrowed** at request broadcast — providers are guaranteed payment exists before accepting a job
- Slashing parameters are governance-controlled but bounded by protocol minimums

---

## Layer 4 — Provider Network

Any operator can supply resources to the PROXY marketplace by registering a provider node.

### Registration Requirements

1. Bond a minimum of `MIN_BOND` $PROXY as collateral
2. Declare supported resource types and associated models/feeds
3. Submit hardware attestation (for compute providers)
4. Pass baseline latency benchmark

### Provider Node Types

| Type | Resource | Minimum Bond | Proof Standard |
|------|----------|-------------|----------------|
| Compute | AI Inference | 500 $PROXY | Output hash vs model weights |
| Oracle | Data Feeds | 250 $PROXY | Signed timestamp + source attestation |
| Relay | API Access | 150 $PROXY | Request/response hash pair |
| Storage | Persistent Storage | 200 $PROXY | Merkle proof of data availability |
| Bandwidth | Network Routing | 100 $PROXY | Transfer receipt with latency proof |

### Slashing Conditions

| Condition | Slash Amount |
|-----------|-------------|
| Failed `DeliveryProof` | 10% of bonded amount |
| Proof timeout (> latency SLA) | 5% of bonded amount |
| Sustained downtime (> 1hr) | 2% of bonded amount per hour |
| Fraudulent proof submission | 50% of bonded amount |

---

## Layer 5 — Proof Layer

The proof layer is PROXY's primary quality enforcement mechanism. Every resource delivery must be accompanied by a `DeliveryProof` before any escrow is released.

### DeliveryProof Schema

```json
{
  "job_id": "0x91cc...f04d",
  "provider_id": "prv_0x4f2a",
  "resource_type": "inference",
  "output_hash": "sha256:a3f1...",
  "model_weights_hash": "sha256:8c2d...",
  "latency_ms": 312,
  "timestamp": 1714000312,
  "signature": "0x..."
}
```

### Proof Standards by Resource Type

**Inference**
- Output must be deterministically reproducible from committed model weights
- Output hash committed on-chain before full output delivered to agent
- Spot-check validation: 5% of jobs re-run by independent validators

**Data Feeds**
- Signed timestamp must fall within acceptable freshness window
- Source attestation must match registered data provider
- Cross-validation against minimum 2 independent oracle sources for price data

**API Access**
- Request/response pair hashed and committed
- Response must match declared API endpoint specification
- Latency proof must be within declared SLA

**Storage**
- Merkle proof of data availability submitted with each retrieval
- Periodic availability challenges issued to storage providers
- Data must be retrievable within committed latency window

---

## Anonymity Architecture

Anonymity in PROXY is enforced at the protocol level through three mechanisms:

### 1. Pseudonymous Wallet Addressing
Agent wallets are Base addresses with no on-chain link to human identity. Agents are identified solely by their wallet address — no name, email, or KYC is required or stored.

### 2. Zero-Knowledge Routing Attestations
The routing layer uses ZK proofs to verify provider eligibility — confirming that a provider has sufficient bond, meets resource requirements, and has an acceptable reliability score — without revealing the provider's wallet address or infrastructure details to the requesting agent.

### 3. Anonymised Proof Submission
`DeliveryProof` objects contain only the minimum information required for settlement verification. No provider identity, no infrastructure details, no geographic data is included in the on-chain proof record.

### What Is Stored On-Chain

| Data | Stored | Purpose |
|------|--------|---------|
| Transaction amount | ✓ | Settlement |
| Proof hash | ✓ | Verification |
| Block timestamp | ✓ | Audit trail |
| Agent wallet address | ✓ | Escrow management |
| Provider wallet address | ✓ | Settlement routing |
| Agent operator identity | ✗ | Not required |
| Provider infrastructure | ✗ | Not required |
| Job content/parameters | ✗ | Not stored on-chain |

---

## Security Considerations

### Smart Contract Risk
- All contracts will undergo independent security audit before mainnet deployment
- Contracts are non-upgradeable post-audit
- Bug bounty programme to be established at testnet launch

### Routing Layer Risk
- Routing layer is operated by the protocol initially, with progressive decentralisation planned in Phase 4
- Routing decisions are deterministic and auditable by any network participant

### Provider Collusion Risk
- Multiple independent validators perform spot-check re-runs on inference jobs
- Slashing parameters create strong economic disincentive for fraudulent proofs
- Governance can adjust validator set and slashing parameters

---

*See also: [`docs/token.md`](token.md) · [`docs/agent-sdk.md`](agent-sdk.md) · [Whitepaper](https://proxy.network/whitepaper)*
