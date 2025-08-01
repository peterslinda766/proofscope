# ProofScope — On-chain Transparency & Risk Intelligence for DeFi Projects

A decentralized blockchain-based platform for transparent, real-time DeFi risk analytics using smart contracts. ProofScope provides auditable risk scores, wallet reputations, and tokenomic tracking, helping investors, dApps, and DAOs make informed decisions.

---

## **Overview**

This system consists of ten smart contracts that work together to deliver on-chain analytics, transparency, and decentralized data services:

1. **Risk Score Oracle** – Publishes DeFi protocol risk metrics on-chain
2. **Subscription Manager** – Handles user payments and access control
3. **Transparency NFT** – Mints non-transferable proof-of-transparency reports
4. **Wallet Reputation Contract** – Categorizes wallet behavior using on-chain data
5. **Governance DAO** – Community voting on models, fees, and contributors
6. **Token Vesting Tracker** – Monitors emissions and vesting schedules
7. **Data Provider Validator** – Verifies oracle node authenticity
8. **Data Request Registry** – Allows custom risk report requests
9. **Analyst Credential SBT** – Issues Soulbound Tokens to verified analysts
10. **Alert Trigger Contract** – Automates risk alerts for DAOs or apps

---

## **Features**

- Decentralized and transparent DeFi risk scoring
- NFT-based proof-of-transparency reports
- Soulbound analyst credentialing system
- Tokenomics and vesting visualization
- Wallet classification and behavior flags
- On-chain event triggers for risk alerts
- Modular subscription-based data feeds
- DAO-controlled scoring models and parameters

---

## **Smart Contracts**

### **Risk Score Oracle**

- Publishes time-based risk metrics for DeFi protocols
- Aggregates off-chain and on-chain analytics
- Data feed updates via validator nodes

### **Subscription Manager**

- Token-gated access to analytics and data feeds
- Handles recurring payments and cancellations
- Tier-based access support

### **Transparency NFT**

- Mints verifiable reports on DeFi project transparency
- Immutable metadata and audit hashes
- Non-transferable for authenticity

### **Wallet Reputation Contract**

- Flags malicious or high-risk wallet behavior
- Supports tagging (e.g., whale, bot, exploiter)
- Pullable data for use in DeFi protocols

### **Governance DAO**

- Community votes on:
  - Risk model updates
  - Fee structures
  - Analyst approvals
- Treasury management and proposal system

### **Token Vesting Tracker**

- Tracks on-chain token releases and emissions
- Visualizes vesting cliffs and schedules
- Alert triggers for cliff completions

### **Data Provider Validator**

- Registers and authenticates oracle nodes
- Verifies proof-of-data origin
- Slashing mechanisms for bad data

### **Data Request Registry**

- dApps and DAOs can request custom risk data
- Bounty-based fulfillment system
- Registry of pending/completed requests

### **Analyst Credential SBT**

- Soulbound tokens for certified on-chain analysts
- Includes reputation, contributions, and history
- Used for DAO voting rights

### **Alert Trigger Contract**

- Pushes on-chain alerts when risks cross thresholds
- Can trigger DAO actions or on-chain warnings
- Integrates with governance automation

---

## **Installation**

1. Install Clarinet CLI  
2. Clone this repository  
3. Run tests: `npm test`  
4. Deploy contracts: `clarinet deploy`  

---

## **Usage**

Each contract provides discrete functionality and can be integrated individually into analytics systems, wallets, or DeFi protocols. Refer to individual contract files and interfaces for usage documentation.

---

## **Testing**

All contracts include unit tests using **Vitest**. Run them with:

```bash
npm test
```

## **License**

MIT License