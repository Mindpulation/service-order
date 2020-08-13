FROM hayd/alpine-deno:latest

 # The port that your application listens to.

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache Index.ts --unstable

CMD ["run", "--allow-net", "--allow-write", "--allow-read", "--allow-plugin", "--unstable", "Index.ts"]
EXPOSE 3040
