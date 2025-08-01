;; Risk Score Oracle Contract
;; Provides decentralized, on-chain risk scores for DeFi protocols

(define-data-var admin principal tx-sender)

;; Each provider must be validated before they can update scores
(define-map data-providers principal bool)

;; Stores the latest risk score and timestamp per protocol
(define-map protocol-scores (protocol principal) 
  (tuple (score uint) (updated-at uint) (provider principal)))

;; Constants
(define-constant ERR-NOT-AUTHORIZED u100)
(define-constant ERR-ALREADY-AUTHORIZED u101)
(define-constant ERR-NOT-REGISTERED u102)
(define-constant ERR-SCORE-TOO-HIGH u103)
(define-constant ERR-SCORE-TOO-LOW u104)

;; Limits for risk score scale (0 to 1000)
(define-constant MAX-RISK-SCORE u1000)
(define-constant MIN-RISK-SCORE u0)

;; Utility: check admin rights
(define-private (is-admin)
  (is-eq tx-sender (var-get admin)))

;; Utility: check if provider is registered
(define-read-only (is-provider (provider principal))
  (default-to false (map-get? data-providers provider)))

;; Admin-only: Add new authorized data provider
(define-public (add-provider (provider principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (asserts! (is-none (map-get? data-providers provider)) (err ERR-ALREADY-AUTHORIZED))
    (map-set data-providers provider true)
    (ok true)
  )
)

;; Admin-only: Remove an authorized provider
(define-public (remove-provider (provider principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (asserts! (is-some (map-get? data-providers provider)) (err ERR-NOT-REGISTERED))
    (map-delete data-providers provider)
    (ok true)
  )
)

;; Oracle provider: Push a new risk score for a protocol
(define-public (set-risk-score (protocol principal) (score uint))
  (begin
    (asserts! (default-to false (map-get? data-providers tx-sender)) (err ERR-NOT-AUTHORIZED))
    (asserts! (<= score MAX-RISK-SCORE) (err ERR-SCORE-TOO-HIGH))
    (asserts! (>= score MIN-RISK-SCORE) (err ERR-SCORE-TOO-LOW))
    (map-set protocol-scores 
             { protocol: protocol }
             {
               score: score,
               updated-at: block-height,
               provider: tx-sender
             })
    (ok true)
  )
)

;; Read-only: Fetch latest risk score for a protocol
(define-read-only (get-risk-score (protocol principal))
  (match (map-get? protocol-scores { protocol: protocol })
    entry (ok entry)
    (err ERR-NOT-REGISTERED)
  )
)

;; Admin-only: Transfer admin rights
(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (var-set admin new-admin)
    (ok true)
  )
)

;; Read-only: Check if a protocol has a registered score
(define-read-only (has-risk-score (protocol principal))
  (is-some (map-get? protocol-scores { protocol: protocol }))
)

;; Read-only: Return the current admin
(define-read-only (get-admin) (ok (var-get admin)))
