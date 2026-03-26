#!/usr/bin/env bash
set -euo pipefail

SOURCE_PROJECT="/Users/mitchell/01_projects/dataset-discovery-engine"
TARGET_SITE="/Users/mitchell/01_projects/personal_site/mwballif.github.io"

(
  cd "${SOURCE_PROJECT}"
  python3 -m src.main_datasets clean-catalog
  python3 -m src.main_datasets harvest-and-export \
    --output "${SOURCE_PROJECT}/data/datasets_snapshot.json"
)

mkdir -p "${TARGET_SITE}/static/data"
cp "${SOURCE_PROJECT}/data/datasets_snapshot.json" "${TARGET_SITE}/static/data/datasets_snapshot.json"

echo "Snapshot refreshed at ${TARGET_SITE}/static/data/datasets_snapshot.json"
