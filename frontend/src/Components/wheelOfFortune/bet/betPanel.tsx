import { useState } from "react"
import BetInput from "./input/betInput"
import BetButton from "./button/betButton"
import { PlaceBet } from "../../../utils/wheelOfForune/wofPlaceBet"
import "./betPanel.css"

export default function BetPanel() {
  const [value, setValue] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleBet = async () => {
    try {
      if (value) {
        await PlaceBet(value)
        setErrorMessage("")
      } else {
        console.log("Please provide value.")
        setErrorMessage("Please provide value.")
      }
    } catch (error: any) {
      if (error.reason && error.reason.includes("Insufficient funds on balance")) {
        setErrorMessage("Insufficient funds on balance")
      }

      if (error.reason && error.reason.includes("No active game sessions")) {
        setErrorMessage("No active game sessions")
      }

      if (error.reason && error.reason.includes("Session already completed")) {
        setErrorMessage("Session already completed")
      }
    }
  }
  return (
    <div className="bet-panel-wrapper">
      <BetInput value={value} onValueChange={(e) => setValue(e.target.value)}></BetInput>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <BetButton onClick={handleBet}>Bet</BetButton>
    </div>
  )
}
