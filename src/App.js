import { useState } from "react";

const messages = [
  {
    id: 29111,
    senderId: 32112,
    content: `Do not forget about tomorrow!`,
  },
  {
    id: 45322,
    senderId: 349432,
    content: `Smart contracts are widely used for automating financial transactions. 
They can hold, transfer, and manage digital assets (cryptocurrencies or tokens) based on 
predefined conditions. For example:
Payment: When specific conditions are met, such as the delivery of goods or services, a smart contract can automatically 
release payment to the seller or service provider.
Escrow Services: Smart contracts can act as escrow agents, holding funds until certain conditions are 
fulfilled, providing a secure way to conduct financial transactions.
Loan Repayment: Smart contracts can automate loan repayment schedules, ensuring that borrowers make
 payments as agreed upon in the contract.
Revenue Sharing: In business agreements, smart contracts can automatically distribute revenue among parties 
based on the terms specified in the contract.`,
  },
  {
    id: 39302,
    senderId: 33213,
    content: `Smart contracts automatically record transactions on the blockchain. When a predefined event or condition is met,
     such as the receipt of goods in a supply chain or the completion of a service in a contract, the smart contract creates a 
     transaction record on the blockchain.
     This automation ensures that data is accurately and immediately recorded without the need for manual intervention.`,
  },
  {
    id: 43221,
    senderId: 42432,
    content: `The use of smart contracts in blockchain technology is particularly valuable for financial
     transactions because it reduces the need for intermediaries, minimizes the risk of fraud, and ensures 
     that transactions are executed precisely according to the agreed-upon terms. Ethereum, a blockchain platform, 
     is well-known for its support of smart contracts,
     enabling a wide range of automated financial and business processes.`,
  },
  {
    id: 413223,
    senderId: 349432,
    content: `How are you doing? Uncaught (in promise) 
    Error: A listener indicated an asynchronous response by returning true,
     but the message channel closed before a response was received`,
  },
  {
    id: 3223,
    senderId: 349432,
    content: `I am happy you have been well!`,
  },
  {
    id: 34323,
    senderId: 42432,
    content: `Register with CIPA first`,
  },
];

const friends = [
  {
    id: 349432,
    name: `Kutlo`,
    surname: `Ranno`,
  },
  { id: 32332, name: `Dineo`, surname: `Jacobs` },
  { id: 32112, name: `Cosmos`, surname: `Tshere` },
  { id: 33213, name: `John`, surname: `Doe` },
  { id: 42432, name: `Nelson`, surname: `Ganelang` },
];

export default function App() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [_friends, _setFriends] = useState(friends);

  function handleAddFriend(friend) {
    _setFriends((friends) => [...friends, friend]);
  }

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    // setSelectedFriend(friend);
  }

  return (
    <div className={"app"}>
      <div className="friendlist">
        <FriendList
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
          _friends={_friends}
          handleShowAddFriend={handleShowAddFriend}
        />
        <Button
          onClick={handleShowAddFriend}
          className={showAddFriend ? "closeform" : ``}
        >
          {showAddFriend ? `Close` : `Add`}
        </Button>
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
      </div>

      {selectedFriend && (
        <MessageBox
          selectedFriend={selectedFriend}
          messages={messages}
          onSelection={handleSelection}
          setSelectedFriend={setSelectedFriend}
        />
      )}
    </div>
  );
}

function MessageBox({ selectedFriend, messages, setSelectedFriend }) {
  const friendMessages = messages.filter(
    (message) => message.senderId === selectedFriend.id
  );

  return (
    <div className="messagebox box">
      <h3>
        {selectedFriend.name} {selectedFriend.surname}
      </h3>

      {friendMessages &&
        friendMessages.map((message) => (
          <p key={message.id} className={"message"}>
            {message.content}
          </p>
        ))}
      <Button onClick={() => setSelectedFriend(null)}>Close</Button>
    </div>
  );
}

function Friend({ friend, onSelection: handleSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? `selected` : ``}>
      <h4>{friend.name}</h4>
      <h4 className="surname">{friend.surname}</h4>
      <Button onClick={() => handleSelection(friend)}>
        {isSelected ? `Close` : `Open`}
      </Button>
    </li>
  );
}

function FriendList({ onSelection, selectedFriend, _friends }) {
  // const [friends_, setFriends] = useState(friends);

  return (
    <ul className="box">
      {_friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function FormAddFriend({ onAddFriend: handleAddFriend }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !surname) return;

    const friend = {
      id: Math.random() * (733453 - 460543) + 460543,
      name,
      surname,
    };

    handleAddFriend(friend);
  }
  return (
    <form onSubmit={handleSubmit} className="box add-friend">
      <label>Friend's name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Friend's surname</label>
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function Button({ children, onClick: handleClick }) {
  return (
    <button className="button" onClick={handleClick}>
      {children}
    </button>
  );
}
