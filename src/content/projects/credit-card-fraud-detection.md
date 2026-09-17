---
title: "Credit Card Fraud Detection"
date: 2026-09-16
---

A comparative study of ten models on credit card fraud detection: five classical
approaches — logistic regression, a decision tree, random forest, SVM and
XGBoost — against five neural architectures — an MLP, a deeper feedforward
network, a CNN, an LSTM and an autoencoder.

The dataset holds 284,807 anonymized transactions, of which 492 are fraudulent:
about 0.17%. The central methodological choice was to leave that imbalance
alone. Most comparisons resample first, oversampling fraud or undersampling
legitimate transactions, which flatters the scores that follow. Training and
evaluating on the real distribution keeps the results honest about deployment
conditions, where fraud stays rare no matter how the training set was balanced.

The autoencoder was treated differently from the rest: trained only on
legitimate transactions and used as an unsupervised anomaly detector, scoring
each transaction by how badly it reconstructs. That covers the case where
labels don't exist, which is the common one — fraud is usually confirmed long
after a transaction clears, if it is confirmed at all.

The tree ensembles came out ahead on precision, XGBoost and random forest both,
and were cheap to train besides. The deep models traded precision for recall:
they caught more fraud and raised more false alarms doing it. Neither result is
simply better. Which one you would deploy depends on whether a missed fraud or a
blocked legitimate customer costs you more, and that is a business question
rather than a modeling one.

Interpretability pulls the same way. In finance a decision has to be explainable
to a customer, a regulator or the analyst reviewing the flag, and tree models
give feature importances that survive that scrutiny where an LSTM does not.

Specific figures are omitted pending a re-run of the evaluation.

[Source on GitHub](https://github.com/Keith2205/credit-card-fraud-detection)
