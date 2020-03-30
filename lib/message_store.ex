defmodule MessageStore do
  use Agent

  def start_link(initial_value) do
    Agent.start_link(fn -> initial_value end, name: __MODULE__)
  end

  def messages do
    Agent.get(__MODULE__, & &1)
  end

  def append(message) do
    Agent.update(__MODULE__, &Enum.take([message | &1], 100))
  end
end
