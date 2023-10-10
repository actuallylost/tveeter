# Welcome to Tveeter

> An open-source chat application built with React, NestJS, and Socket.io.

This is a project I built to learn more about how React, NestJS, and Socket.io work together.

## Directories

-   `web`: React using Next for routing (frontend)
-   `api`: NestJS & Socket.io for api management and websockets (backend)

## Running the app

ITo run the frontend you'll need to create a `.env` file under the `web` directory and add the values `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_API_KEY`. You can get these values by following the documentation on [Supabase](https://supabase.com/).

Then run:

```bash
cd web
pnpm install
pnpm dev
```

and for the backend:

```bash
cd api
pnpm install
pnpm start:dev
```

## License

Tveeter is under the GPL-3.0 license. See the [LICENSE](LICENSE) file for more info.
