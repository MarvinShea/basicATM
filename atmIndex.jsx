const ATMDeposit = ({ onChange, isDeposit, atmMode }) => {
  const choice = ["Deposit", "Withdraw"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      {
        atmMode && <div>
          <h3> {choice[Number(!isDeposit)]}</h3>
          <input type="number" width="200" onChange={onChange}></input>
          <input type="submit" width="200" value="Submit"></input>
        </div>
      }
    </label>
  );
};

const Account = () => {
  let deposit = 0; // state of this transaction
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    deposit = Number(event.target.value);
  };
  const handleSubmit = (event) => {
    if (deposit <= 0) {
      return (event.preventDefault());
    }
    let newTotal;
    if (isDeposit) {
      newTotal = totalState + deposit;
      setTotalState(newTotal);
    }
    else if (!isDeposit && totalState >= deposit && deposit > 0) {
      let result = confirm("Are you sure?");
      if (result) {
        newTotal = totalState - deposit;
        setTotalState(newTotal);
      } else {
        setTotalState(totalState);
      }
    } else if (!isDeposit && totalState < deposit) {
      alert("Insufficient funds available")
      setTotalState(totalState);
    }
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    if (event.target.value == "") {
      setIsDeposit(isDeposit)
    } else if (event.target.value == "Deposit") {
      setIsDeposit(true)
    } else if (event.target.value == "Withdrawal") {
      setIsDeposit(false)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Withdrawal">Withdraw</option>
      </select><br></br>
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode}></ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
