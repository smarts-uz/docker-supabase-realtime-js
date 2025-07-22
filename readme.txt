psql -h localhost -U postgres -d postgres
$ docker run --rm   --env-file .env   --add-host=host.docker.internal:host-gateway   -p 4000:4000   supabase/realtime
psql -h 192.168.x.x -U postgres -d postgres

docker run --rm elixir:1.17-alpine elixir -e "IO.puts(:crypto.strong_rand_bytes(64) |> Base.encode64)"
docker run --rm --env-file .env -p 4000:4000 supabase/realtime