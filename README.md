# PROXY Protocol

**The anonymous transaction layer for autonomous AI agents.**

[![Built on Base](https://img.shields.io/badge/Built%20on-Base-0052FF?style=flat-square&logo=ethereum)](https://base.org)
[![Token](https://img.shields.io/badge/Token-$PROXY-5b6fff?style=flat-square)](https://flaunch.gg)
[![Launch](https://img.shields.io/badge/Launch-Flaunch-00d97e?style=flat-square)](https://flaunch.gg)
[![License](https://img.shields.io/badge/License-MIT-white?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Pre--Launch-yellow?style=flat-square)]()

---

## The Problem

AI agents are operational. They reason, plan, and execute complex tasks autonomously. But every time an agent needs to **spend money** — on inference, data, storage, or APIs — a human has to intervene.

There is no on-chain payment layer built for agents. Every resource procurement routes through centralised APIs tied to human accounts, credit cards, and corporate identities. The autonomy of the agent is an illusion at the transactional layer.

> **0 protocols exist today that enable autonomous AI agents to transact anonymously and without human intervention.**

---

## The Solution

PROXY is the on-chain payment and resource procurement protocol built exclusively for autonomous AI agents.

- **Agents hold $PROXY** — a non-custodial wallet funded once by the operator
- **Agents spend $PROXY** — to procure compute, data, storage, APIs, and bandwidth
- **Everything settles on Base** — instantly, anonymously, verifiably on-chain
- **No human required** — at any stage of the transaction

```
Agent → Request → Anonymous Routing → Provider → Proof → Settlement → $PROXY
```

---

## How It Works

| Step | Action |
|------|--------|
| **01** | Agent wallet initialised on Base with $PROXY funding |
| **02** | Agent broadcasts signed `AgentRequest` — resource type, parameters, budget ceiling |
| **03** | Routing layer matches to provider anonymously via ZK attestation |
| **04** | Provider fulfils request, submits cryptographic `DeliveryProof` |
| **05** | Proof verified → escrow released → $PROXY settled instantly |

Full protocol specification: [`docs/architecture.md`](docs/architecture.md)

---

## Resource Marketplace

Agents spend $PROXY across six resource categories:

| Resource | Status | Description |
|----------|--------|-------------|
| **AI Inference** | Launch | Open-weight models: Llama 3.3, Mistral, Qwen 2.5, DeepSeek |
| **Data Feeds** | Launch | Price oracles, on-chain analytics, market intelligence |
| **API Access** | Phase 2 | Anonymised relay for web, RPC, search, and external APIs |
| **Storage** | Phase 2 | Decentralised storage for agent memory, embeddings, outputs |
| **Bandwidth** | Phase 3 | High-throughput anonymous routing for agent operations |
| **Agent → Agent** | Phase 3 | Trustless payments between orchestrator and sub-agents |

---

## Protocol Architecture

```
┌─────────────────────────────────────┐
│         Agent Wallet SDK            │  ← Non-custodial entry point
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│      Request & Routing Layer        │  ← Anonymous matching via ZK
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│      Escrow Smart Contracts         │  ← Base L2 · Atomic escrow
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│          Provider Network           │  ← Bonded nodes · Staked
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│           Proof Layer               │  ← DeliveryProof verification
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│      Settlement → $PROXY            │  ← Instant · On-chain · Immutable
└─────────────────────────────────────┘
```

Full architecture documentation: [`docs/architecture.md`](docs/architecture.md)

---

## $PROXY Token

$PROXY is the **sole payment and settlement currency** of the PROXY protocol. There is no ETH fallback, no stablecoin bypass, no fiat gateway.

| Property | Detail |
|----------|--------|
| **Token** | $PROXY |
| **Network** | Base (Chain ID: 8453) |
| **Standard** | ERC-20 |
| **Launch** | Flaunch — Fair Launch |
| **Pre-sale** | None |
| **Insider Allocation** | None |

Every inference job, data feed purchase, API call, and storage allocation consumes $PROXY. Every active provider bonds $PROXY as collateral. Dual-sided supply compression as the network scales.

Full token specification: [`docs/token.md`](docs/token.md)

---

## Anonymity

Anonymity in PROXY is not a feature — it is the **default state** of every transaction.

- Pseudonymous wallet addressing — agents have no name, email, or KYC
- Zero-knowledge routing attestations — providers verified without identity exposure
- Anonymised proof submission — job parameters only, no operator identity

Neither agents nor providers are required to reveal any identity information at any point in the transaction lifecycle.

---

## Roadmap

```
● Phase 01 — Genesis        [NOW]
  Token launch · Website · Whitepaper · GitHub · Early access

○ Phase 02 — Testnet
  Base Sepolia deployment · Agent Wallet SDK alpha · Provider integrations

○ Phase 03 — Mainnet
  Base mainnet · Public marketplace · Agent SDK release · First live settlements

○ Phase 04 — Ecosystem
  Agent→Agent payments · DAO governance · Cross-chain · Enterprise integrations
```

Full roadmap: [`ROADMAP.md`](ROADMAP.md)

---

## Documentation

| Document | Description |
|----------|-------------|
| [`docs/architecture.md`](docs/architecture.md) | Full protocol architecture and technical specification |
| [`docs/token.md`](docs/token.md) | $PROXY token specification and economics |
| [`docs/agent-sdk.md`](docs/agent-sdk.md) | Agent Wallet SDK specification |
| [`ROADMAP.md`](ROADMAP.md) | Development roadmap and milestones |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | How to contribute to PROXY |
| [Whitepaper](https://proxy.network/whitepaper) | Full technical whitepaper |

---

## Links

- **Website:** [proxy.network](https://proxy.network)
- **Whitepaper:** [proxy.network/whitepaper](https://proxy.network/whitepaper)
- **Token:** $PROXY on Base via [Flaunch](https://flaunch.gg)
- **Twitter/X:** [@proxyprotocol](https://x.com/proxyprotocol)
- **Discord:** [discord.gg/proxy](https://discord.gg/proxy)

---

## Disclaimer

This repository is for informational purposes only. The PROXY protocol is in development. Nothing in this repository constitutes financial advice or a solicitation to purchase any token or security. Participation in any token launch carries significant risk. Please conduct your own research.

---

*© 2026 PROXY Protocol — Built on Base*
