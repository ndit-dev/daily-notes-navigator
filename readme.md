# Daily Notes Navigator for Obsidian

A simple plugin for Obsidian that adds commands to navigate between daily notes based on the currently opened note. This plugin allows you to move forwards and backwards through your daily notes regardless of the current date.

## Features

- Navigate to next/previous daily note from your current note
- Jump forward/backward by weeks (7 days)
- Navigate to next/previous month
- Jump to start/end of current month
- Automatically creates new daily notes if they don't exist
- Works with any folder structure for daily notes
- Shows helpful notifications when creating or opening notes

## Commands

All commands can be bound to hotkeys in Obsidian's settings:

- **Go to next daily note**: Opens the next day's note
- **Go to previous daily note**: Opens the previous day's note
- **Go to next week**: Jumps forward 7 days
- **Go to previous week**: Jumps backward 7 days
- **Go to next month**: Navigates to the same day next month
- **Go to previous month**: Navigates to the same day in the previous month
- **Go to start of month**: Jumps to the first day of the current month
- **Go to end of month**: Jumps to the last day of the current month

## Installation

### From Obsidian Community Plugins

1. Open Settings in Obsidian
2. Navigate to Community Plugins and Browse
3. Search for "Daily Notes Navigator"
4. Click Install
5. Enable the plugin in your Community Plugins settings

### Manual Installation

1. Download the latest release from the releases page
2. Extract the files into your `.obsidian/plugins/daily-notes-navigator/` folder
3. Reload Obsidian (Ctrl/Cmd + R)
4. Enable the plugin in your Community Plugins settings

## Usage

1. Open any daily note (must be in YYYY-MM-DD format)
2. Use the commands from the Command Palette or your configured hotkeys
3. The plugin will automatically create new notes if they don't exist

## Recommended Hotkeys

You can set these up in Settings → Hotkeys:
- Next Day: `Alt + →`
- Previous Day: `Alt + ←`
- Next Week: `Alt + Shift + →`
- Previous Week: `Alt + Shift + ←`

## Requirements

- The plugin expects daily notes to be named in YYYY-MM-DD format (e.g., 2024-03-14.md)
- Obsidian v0.15.0 or higher

## Support

If you encounter any issues or have feature requests, please file them in the GitHub issues section.

## License

MIT License - see LICENSE file for details.