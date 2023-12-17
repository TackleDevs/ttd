# ttd (twi-douga to discord)

twi-dougaのランキングをdiscordに送信します。

- `/realtime`コマンドで、リアルタイムランキングを送信します。

- `/set`コマンドで、そのチャンネルに毎日ランキングを送信します。

- `/unset`コマンドで、送信を中止します。

## Getting Started

```bash
# set env
cp .env.sample .env.local
vim .env.local
# install packages
bun i
# install browser
bun run puppeteer
# init database
bun run prisma
# start server
bun start
```

### Run Bun as a daemon with systemd

read here.

https://bun.sh/guides/ecosystem/systemd

## Development

```bash
# install packages
bun i
# install browser
bun run puppeteer
# init database
bun run prisma:dev

# start server
bun dev
```
