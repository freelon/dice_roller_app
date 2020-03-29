defmodule DiceRollerApp.SocketHandler do
  @behaviour :cowboy_websocket

  def init(request, _state) do
    state = %{registry_key: request.path}

    {:cowboy_websocket, request, state}
  end

  def websocket_init(state) do
    Registry.DiceRollerApp
    |> Registry.register(state.registry_key, {})
    
    {:ok, state}
  end

  def websocket_handle({:text, json}, state) do
    payload = Jason.decode!(json)
    IO.inspect payload
    message = payload["data"]["message"]
    name = payload["data"]["name"]

    reg = Regex.named_captures(~r/(?<num_dice>\d*)d(?<num_sides>\d+)/, message)
    response = case reg do
        nil -> message
        reg -> "match"
    end
    
    Registry.DiceRollerApp
    |> Registry.dispatch(state.registry_key, fn(entries) -> 
      for {pid, _} <- entries do
        Process.send(pid, "#{name}: #{response}", [])
      end
    end)

    {:reply, {:text, message}, state}
  end

  def websocket_info(info, state) do
    {:reply, {:text, info}, state}
  end
end