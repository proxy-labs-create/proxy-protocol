# $PROXY Token Specification

**PROXY Protocol — Token Economics & Utility**

> Version: 1.0 · 2026

---

## Overview

$PROXY is the sole payment and settlement currency of the PROXY protocol. There is no alternative payment path — no ETH fallback, no stablecoin bypass, no fiat gateway.

Every resource transaction on the PROXY network is denominated in $PROXY and settled in $PROXY. This is not a design preference — it is protocol-level enforcement that creates a direct, structural relationship between network usage and token demand.

---

## Token Parameters

| Property | Value |
|----------|-------|
| **Name** | PROXY |
| **Ticker** | $PROXY |
| **Network** | Base (Ethereum L2, Chain ID: 8453) |
| **Standard** | ERC-20 |
| **Launch Platform** | Flaunch — Fair Launch Protocol |
| **Pre-sale** | None |
| **Insider Allocation** | None |
| **Venture Capital** | None |

---

## Token Utility

### 1. Resource Payment — The Only Currency

All marketplace transactions are settled exclusively in $PROXY. Every inference job, data feed purchase, API call, and storage allocation consumes $PROXY from the agent's wallet.

There is no alternative payment path. An agent that wants to use the PROXY network must hold $PROXY. A provider that wants to receive payment must accept $PROXY. This creates a closed economic loop where every unit of network activity generates token demand.

### 2. Provider Bonding

Providers bond $PROXY to register nodes on the network. This bond:

- Acts as collateral against delivery failures
- Is subject to slashing for protocol violations
- Locks supply from circulation for the duration of active registration
- Creates a supply sink that scales with the number of active providers

As provider count grows, the amount of $PROXY locked in bonding grows proportionally — contracting circulating supply while network capacity expands.

### 3. Staking and Job Priority

Providers stake additional $PROXY above their minimum bond to increase their weighting in the routing algorithm.

```
routing_weight = base_weight * (1 + stake_multiplier * staked_amount)
```

Higher stake weight means a higher share of incoming job allocations. This creates a direct economic incentive for providers to accumulate and stake $PROXY — creating an additional supply sink beyond minimum bonding requirements.

### 4. Governance

$PROXY holders govern the protocol through an on-chain DAO. Governance scope includes:

- Resource category additions and removals
- Proof standard updates and validation parameters
- Fee structure adjustments
- Dispute resolution rule amendments
- Treasury allocation decisions
- Routing algorithm weight parameters
- Slashing condition thresholds

1 $PROXY = 1 vote. Governance is activated in Phase 4.

---

## Supply Dynamics

### Dual-Sided Supply Compression

The PROXY token economics create a dual-sided supply compression mechanism:

**Demand Side — Continuous Velocity**
Every agent transaction removes $PROXY from the agent's wallet and transfers it to a provider. As agent count and transaction volume grow, the rate of $PROXY flowing through the system increases. Every new agent, every new use case, every new resource category adds to this velocity.

**Supply Side — Bonded Lockup**
Every active provider has bonded $PROXY locked from circulation. Providers with higher stake have additional $PROXY locked. As provider count grows to meet demand, bonded supply contracts the tradeable float.

**The Combined Effect**

```
As agent adoption ↑:
  Transaction volume ↑
  Provider demand ↑
  Bonded supply ↑
  Circulating supply ↓
  Token velocity ↑
```

This is not speculative mechanics — it is the direct consequence of a network where the token is the only payment currency and providers must bond to participate.

### No Emissions

$PROXY has no continuous emission schedule. There are no mining rewards, no staking yields paid in new tokens, and no inflationary mechanisms. Supply is fixed at launch. The only source of token flow is marketplace transactions between agents and providers.

---

## Token Flow

```
OPERATOR funds agent wallet with $PROXY
         ↓
AGENT spends $PROXY on resources
         ↓
$PROXY held in escrow during job
         ↓
PROOF verified → $PROXY released to PROVIDER
         ↓
PROVIDER holds, re-stakes, or sells $PROXY
```

Operators who want their agents to operate must continuously supply $PROXY. Providers who want to participate must continuously hold bonded $PROXY. Both sides of the market require $PROXY to function.

---

## Fair Launch

PROXY launches via [Flaunch](https://flaunch.gg) — a fair launch protocol on Base.

**What fair launch means for $PROXY:**

- No pre-sale at any price to any party
- No venture capital allocation
- No team allocation with vesting advantage
- No whitelist or private round
- Every participant accesses $PROXY at the same price from the first block

The PROXY team's only source of $PROXY is the same public market as every other participant. Our incentive to build is aligned entirely with the protocol's success — not with a pre-allocated token position.

---

## Disclaimer

$PROXY is a utility token designed for use within the PROXY protocol. It is not a security, an investment contract, or a share in any company. Holding $PROXY does not entitle the holder to any profit share, dividend, or financial return. Token value is determined entirely by market forces and network utility. Participation in any token launch carries significant risk including total loss of capital.

---

*See also: [`docs/architecture.md`](architecture.md) · [`docs/agent-sdk.md`](agent-sdk.md) · [Whitepaper](https://proxy.network/whitepaper)*
