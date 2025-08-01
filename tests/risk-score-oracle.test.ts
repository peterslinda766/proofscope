import { describe, it, expect, beforeEach } from "vitest"

// Mock state and logic for the Clarity Risk Score Oracle
const mockOracle = {
  admin: "ST1ADMIN",
  providers: new Map<string, boolean>(),
  scores: new Map<string, { score: number; updatedAt: number; provider: string }>(),
  blockHeight: 10000,

  isAdmin(caller: string) {
    return caller === this.admin
  },

  addProvider(caller: string, provider: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    if (this.providers.has(provider)) return { error: 101 }
    this.providers.set(provider, true)
    return { value: true }
  },

  removeProvider(caller: string, provider: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    if (!this.providers.has(provider)) return { error: 102 }
    this.providers.delete(provider)
    return { value: true }
  },

  setRiskScore(caller: string, protocol: string, score: number) {
    if (!this.providers.get(caller)) return { error: 100 }
    if (score > 1000) return { error: 103 }
    if (score < 0) return { error: 104 }

    this.scores.set(protocol, {
      score,
      updatedAt: this.blockHeight,
      provider: caller,
    })

    return { value: true }
  },

  getRiskScore(protocol: string) {
    const entry = this.scores.get(protocol)
    if (!entry) return { error: 102 }
    return { value: entry }
  },

  transferAdmin(caller: string, newAdmin: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    this.admin = newAdmin
    return { value: true }
  },

  reset() {
    this.providers.clear()
    this.scores.clear()
    this.admin = "ST1ADMIN"
    this.blockHeight = 10000
  },
}

describe("Risk Score Oracle Contract", () => {
  beforeEach(() => {
    mockOracle.reset()
  })

  it("should allow admin to add a provider", () => {
    const result = mockOracle.addProvider("ST1ADMIN", "ST2PROVIDER")
    expect(result).toEqual({ value: true })
    expect(mockOracle.providers.has("ST2PROVIDER")).toBe(true)
  })

  it("should prevent non-admin from adding a provider", () => {
    const result = mockOracle.addProvider("ST2USER", "ST2PROVIDER")
    expect(result).toEqual({ error: 100 })
  })

  it("should allow registered provider to set a risk score", () => {
    mockOracle.addProvider("ST1ADMIN", "ST2PROVIDER")
    const result = mockOracle.setRiskScore("ST2PROVIDER", "ST3PROTOCOL", 820)
    expect(result).toEqual({ value: true })
  })

  it("should reject scores above the max limit", () => {
    mockOracle.addProvider("ST1ADMIN", "ST2PROVIDER")
    const result = mockOracle.setRiskScore("ST2PROVIDER", "ST3PROTOCOL", 1200)
    expect(result).toEqual({ error: 103 })
  })

  it("should allow admin to transfer admin rights", () => {
    const result = mockOracle.transferAdmin("ST1ADMIN", "ST3NEWADMIN")
    expect(result).toEqual({ value: true })
    expect(mockOracle.admin).toBe("ST3NEWADMIN")
  })

  it("should return the correct risk score entry", () => {
    mockOracle.addProvider("ST1ADMIN", "ST2PROVIDER")
    mockOracle.setRiskScore("ST2PROVIDER", "ST3PROTOCOL", 500)
    const result = mockOracle.getRiskScore("ST3PROTOCOL")
    expect(result).toEqual({
      value: {
        score: 500,
        updatedAt: 10000,
        provider: "ST2PROVIDER",
      },
    })
  })

  it("should reject setting score by unregistered provider", () => {
    const result = mockOracle.setRiskScore("ST3UNKNOWN", "ST3PROTOCOL", 300)
    expect(result).toEqual({ error: 100 })
  })

  it("should reject removing unregistered provider", () => {
    const result = mockOracle.removeProvider("ST1ADMIN", "ST9MISSING")
    expect(result).toEqual({ error: 102 })
  })
})
