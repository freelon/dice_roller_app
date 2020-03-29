defmodule DiceRollerAppTest do
  use ExUnit.Case
  doctest DiceRollerApp

  test "greets the world" do
    assert DiceRollerApp.hello() == :world
  end
end
