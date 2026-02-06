# Project Instructions for Claude

## Product Information

The `product/` folder contains all product documentation:
- [Product Overview](./product/overview.md) — Product description, target audience, problems solved, key features, and brand positioning
- [Product Roadmap](./product/roadmap.md) — Landing page sections and implementation plan
- [Data Model](./product/data-model.md) — Core entities, fields, relationships, and data flow

## Browser Automation

For all browser automation tasks, use **agent-browser** instead of other tools.

### UI Testing

When testing the application's UI, always use **headed mode** to show the browser window:
```bash
agent-browser --headed [command]
```

This allows for visual verification of the UI during testing.

### Snapshots and Accessibility Trees

Always rely on **accessibility trees** for understanding and interacting with the UI. For efficiency, take **full-page snapshots**:
```bash
agent-browser snapshot --full -i
```

- The `--full` flag captures the entire page
- The `-i` flag shows only interactive elements
- Use the `@ref` references from the accessibility tree to interact with elements (e.g., `agent-browser click @e5`)

Accessibility trees provide the most reliable way to understand page structure and interact with elements.

If you are unsure about available commands, run:
```bash
agent-browser --help
```

This will show all available browser automation commands and their usage.
