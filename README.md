<h1 align="center">Discord.js Bot Template</h1>

<p align="center">
  <a href="https://github.com/twiistrzdev/djs-bot-template">
    <img src="https://skillicons.dev/icons?i=discord,ts,nodejs,git,github" />
  </a>
</p>

## Prerequisite

⚠️ [Discord.js v14](https://github.com/discordjs/discord.js/milestone/3) is still in development—bugs are to be expected.

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js 16.9.0 or newer](https://nodejs.org/en/)
- [Discord Application](https://discord.com/developers/applications)
  1. First, you must go to the developer section of Discord to create a [new application](https://discord.com/developers/applications).
  2. At the top right, click on the "**New Application**" button.
  3. Once the application is created, go to the "Bot" section, click on "Add Bot", then confirm "Yes, Do It!".
  4. Scroll down to the "Privileged Gateway Intents" — Be sure to enable the `Presence Intent` and `Server Members Intent`, then save.

## Installation

```sh-session
git clone https://github.com/twiistrzdev/djs-bot-template.git
```

```sh-session
npm install
```

```sh-session
npm run build
```

```sh-session
npm run deploy
```

```sh-session
npm run dev
```

## Features

- Example Template Files
  - Builders
    - [Button](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/builders/buttons/button.example.ts)
    - [Context Menu](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/builders/contextmenus/contextmenu.example.ts)
    - [Modal](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/builders/modals/modal.example.ts)
    - [Select Menu](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/builders/selectmenus/selectmenu.example.ts) - ⚠️ Confirmed Bug | Has PR [#8174](https://github.com/discordjs/discord.js/pull/8174)
    - [Slash Command : Command](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/builders/slashcommands/command.example.ts)
    - [Slash Command : Subcommand](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/builders/slashcommands/subcommand.example.ts)
  - Commands
    - [Command](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/commands/command.example.ts)
    - [Subcommand](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/commands/subcommand.example.ts)
  - ContextMenus
    - [Context Menu](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/contextmenus/contextmenu.example.ts)
  - Interactions
    - [Button](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/interactions/button.example.ts)
    - [Modal Submit](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/interactions/modalsubmit.example.ts)
- [Configs](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/utils/config.ts)
- [Modules (_Categories_)](https://github.com/twiistrzdev/djs-bot-template/blob/main/src/client/enums/modules.ts)
- Commands Handler
- ContextMenus Handler
- Interactions Handler
- Events Handler
- Deploy Commands and ContextMenus

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested.
See [the contribution guide](https://github.com/twiistrzdev/djs-bot-template/blob/main/.github/CONTRIBUTING.md) if you'd like to submit a PR.

## Author

**DJS Bot Template** © [Twiistrz](https://github.com/twiistrzdev).
Authored and maintained by Twiistrz.

> GitHub [@twiistrzdev](https://github.com/twiistrzdev)
