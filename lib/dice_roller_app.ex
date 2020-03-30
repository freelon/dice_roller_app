defmodule DiceRollerApp do
  use Application

  def start(_type, _args) do
    children = [
      Plug.Cowboy.child_spec(
        scheme: :http,
        plug: DiceRollerApp.Router,
        options: [
          dispatch: dispatch(),
          port: 4000
        ]
      ),
      Registry.child_spec(
        keys: :duplicate,
        name: Registry.DiceRollerApp
      )
    ]

    opts = [strategy: :one_for_one, name: DiceRollerApp.Application]
    Supervisor.start_link(children, opts)
    MessageStore.start_link([])
  end

  defp dispatch do
    [
      {:_,
        [
          {"/ws/[...]", DiceRollerApp.SocketHandler, []},
          {:_, Plug.Cowboy.Handler, {DiceRollerApp.Router, []}}
        ]
      }
    ]
  end
end