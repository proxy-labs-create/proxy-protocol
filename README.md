[README.md](https://github.com/user-attachments/files/28069695/README.md)
# PROXY Protocol

**The permissionless payment layer for autonomous AI agents.**

[![Built on Base](https://img.shields.io/badge/Built%20on-Base-0052FF?style=flat-square&logo=ethereum)](https://base.org)
[![Token](https://img.shields.io/badge/Token-$PROXY-c8a96e?style=flat-square)](https://proxyprotocol.org)
[![Status](https://img.shields.io/badge/Status-Live-00d97e?style=flat-square)]()
[![License](https://img.shields.io/badge/License-MIT-white?style=flat-square)](LICENSE)
[![Playground](https://img.shields.io/badge/Playground-Live-c8a96e?style=flat-square)](https://proxyprotocol.org/playground.html)

---

## The Problem

Agent payment infrastructure exists. x402 processes hundreds of millions of transactions. Agentic Wallets are in production. The problem is no longer that agent payments don't work — it's who controls them.

**x402 is Coinbase's infrastructure.** It ships with built-in KYT (Know Your Transaction) compliance screening on every transaction. It settles in USDC — a stablecoin Circle can freeze. It routes through Coinbase infrastructure that Coinbase can update, restrict, or shut down.

> **For agents that need to operate without a corporate gatekeeper, without KYT screening, and without a settlement currency that can be frozen — no permissionless alternative exists. Until PROXY.**

---

## The Solution

PROXY is the permissionless, anonymous payment protocol for autonomous AI agents on Base.

- **No KYT screening** — transactions are not monitored or filtered
- **Native token settlement** — $PROXY has no issuer and cannot be frozen
- **No admin keys** — no entity can block a transaction or shut down the protocol
- **Anonymous by default** — agent wallets are Base addresses, nothing more
- **Non-custodial** — agents control their own keys post-deployment

```
Agent → Request → Anonymous Routing → Provider → Proof → Settlement → $PROXY
```

---

## How PROXY Differs from x402

| Property | PROXY | x402 / Agentic Wallets |
|----------|-------|----------------------|
| Controlled by | Nobody | Coinbase |
| Transaction screening | None | Built-in KYT |
| Settlement currency | $PROXY (native, unfreezable) | USDC (Circle can freeze) |
| Custody | Non-custodial | Coinbase infrastructure |
| Off switch | None | Yes |
| Permissionless | Yes | No |

---

## Live Playground

The PROXY Playground is live at [proxyprotocol.org/playground.html](https://proxyprotocol.org/playground.html)

Watch an agent:
- Initialise a non-custodial wallet on Base
- Broadcast a signed `AgentRequest` with escrowed budget
- Get anonymously matched to a provider via ZK attestation
- Execute inference and submit a `DeliveryProof`
- Settle $PROXY instantly on-chain — no KYT, no screening, no gatekeeper

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

| Resource | Status | Description |
|----------|--------|-------------|
| **AI Inference** | Launch | Open-weight models: Llama 3.3, Mistral, Qwen 2.5, DeepSeek |
| **Data Feeds** | Launch | Price oracles, on-chain analytics, market intelligence |
| **API Access** | Phase 2 | Anonymised relay — no IP exposure, no rate limits tied to identity |
| **Storage** | Phase 2 | Decentralised storage for agent memory, embeddings, outputs |
| **Bandwidth** | Phase 3 | High-throughput anonymous routing for agent operations |
| **Agent → Agent** | Phase 3 | Trustless payments between orchestrator and sub-agents |

---

## $PROXY Token

$PROXY is the sole settlement currency of the PROXY protocol. The choice of native token over stablecoin is not a tokenomic preference — it is an architectural decision.

USDC can be frozen by Circle. Stablecoins have issuers. $PROXY has neither. It is a permissionless settlement currency that no entity can blacklist, freeze, or censor.

| Property | Detail |
|----------|--------|
| **Token** | $PROXY |
| **Network** | Base (Chain ID: 8453) |
| **Standard** | ERC-20 |
| **Launch** | Fair Launch on Base |
| **Pre-sale** | None |
| **Insider Allocation** | None |
| **Venture Capital** | None |

Full token specification: [`docs/token.md`](docs/token.md)

---

## Protocol Architecture

```
┌─────────────────────────────────────┐
│         Agent Wallet SDK            │  ← Non-custodial · No KYC
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│      Request & Routing Layer        │  ← Anonymous matching · ZK attestation
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│      Escrow Smart Contracts         │  ← Base L2 · No admin keys
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│          Provider Network           │  ← Bonded nodes · Permissionless entry
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│           Proof Layer               │  ← DeliveryProof verification
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│   Settlement → $PROXY               │  ← Instant · Unfreezable · Immutable
└─────────────────────────────────────┘
```

---

## Roadmap

```
● Phase 01 — Genesis        [COMPLETE]
  Token launch · Website · Whitepaper · GitHub · Playground · Early access

○ Phase 02 — Testnet        [IN PROGRESS]
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
| [Whitepaper](https://proxyprotocol.org/whitepaper.html) | Full technical whitepaper |

---

## Links

- **Website:** [proxyprotocol.org](https://proxyprotocol.org)
- **Playground:** [proxyprotocol.org/playground.html](https://proxyprotocol.org/playground.html)
- **Whitepaper:** [proxyprotocol.org/whitepaper.html](https://proxyprotocol.org/whitepaper.html)
- **Token:** $PROXY on Base
- **Twitter/X:** [@proxyprotocol](https://x.com/proxyprotocol)
- **Telegram:** [t.me/proxyprotocol](https://t.me/proxyprotocol)

---

## Disclaimer

This repository is for informational purposes only. The PROXY protocol is in development. Nothing in this repository constitutes financial advice or a solicitation to purchase any token or security. Participation in any token launch carries significant risk. Please conduct your own research.

---

*© 2026 PROXY Protocol — Built on Base*
