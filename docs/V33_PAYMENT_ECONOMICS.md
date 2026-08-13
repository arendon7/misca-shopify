# MISCA V33 — Payment Economics

Date: 2026-08-13

## Shopify Colombia planning baseline
Current Shopify Colombia pricing reviewed:
- Basic: US$19/month billed annually or US$25/month monthly.
- Basic: 2% third-party payment-provider transaction fee.

Current Shopify Payments supported-country documentation does not list Colombia, so budget an external provider unless the actual Admin later shows a new local option. Shopify subscription is fixed overhead, not unit COGS.

## Mercado Pago baseline
Mercado Pago currently documents Shopify integration for Colombia.
Public online-payment tariffs reviewed:
- immediate: 3.29% + $800 + IVA;
- 7 days: 2.99% + $800 + IVA;
- 14 days: 2.79% + $800 + IVA.

Planning estimates assume the gateway fee is subject to 19% IVA and Shopify Basic adds 2% of gross order. They exclude refunds, chargebacks and any extra tax/currency treatment on Shopify fees.

| Product | Retail | Release | Gateway incl. IVA | Shopify 2% | Payment cost | % retail |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| Raíz | $119.900 | immediate | $5.646 | $2.398 | **$8.044** | **6.71%** |
| Raíz | $119.900 | 7d | $5.218 | $2.398 | **$7.616** | **6.35%** |
| Raíz | $119.900 | 14d | $4.933 | $2.398 | **$7.331** | **6.11%** |
| Ola | $139.900 | immediate | $6.429 | $2.798 | **$9.227** | **6.60%** |
| Ola | $139.900 | 7d | $5.930 | $2.798 | **$8.728** | **6.24%** |
| Ola | $139.900 | 14d | $5.597 | $2.798 | **$8.395** | **6.00%** |

A slower release lowers fee but uses more working capital.

## Alternatives
- **ePayco:** current documentation confirms official Shopify plugin/Standard Checkout. Commercial tariff still needs a written quote.
- **Wompi:** current public benchmark around 2.65% + $700 + IVA. Its observed plugin list did not show Shopify, so treat it as a price benchmark until integration is verified.

## Known-cost headroom
Using V32 T265 six-unit blank cost: $26.000.
Using Mercado Pago immediate + Shopify Basic as conservative payment benchmark:

| Product | Retail | Blank | Payment | Remaining before all other costs |
| --- | ---: | ---: | ---: | ---: |
| Raíz | $119.900 | $26.000 | $8.044 | **$85.856** |
| Ola | $139.900 | $26.000 | $9.227 | **$104.673** |

This remainder still pays print, packaging, shipping subsidy, return/exchange reserve, taxes, creator/rights variable, CAC and contribution. It is not margin.

## Proposed internal contribution screen
Controlled-launch target: ≥45% contribution before CAC after all other variable costs. Stronger target: ≥50%.

Maximum combined budget for print + packaging + shipping subsidy + returns reserve + taxes + creator/rights variable under the immediate-payment benchmark:

| Product | 45% target | 50% target |
| --- | ---: | ---: |
| Raíz | **$31.901** | **$25.906** |
| Ola | **$41.718** | **$34.723** |

Do not approve a print quote in isolation; it must fit inside this combined budget after tax and operating inputs are known.

## Tax caution
Colombia's general IVA rate is 19% unless an exception applies. MISCA must confirm with an accountant the actual entity/regime, tax-inclusive pricing, input IVA credits, invoicing and withholding. Do not mechanically subtract 19% from retail before validating the tax position.

## Next gates
1. Written print quotes at 1/6/12/24.
2. Current ePayco tariff comparison.
3. Packaging quote.
4. Shipping/subsidy policy.
5. Returns reserve.
6. Creator/rights variable.
7. Accountant-confirmed tax treatment.
8. Only then finalize price and maximum CAC.

Full unit economics: BLOCKED until these rows are evidenced.
Public commerce: FAIL CLOSED.
