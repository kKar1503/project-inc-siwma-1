const bluemessages = [
  { message: 'Hi' },
  { message: 'I am interested in the item.' },
  { message: 'Could we negotiate on the cost of the items?' },
];

const greymessages = [
  {
    message:
      'Hello! What price point would you be comfortable with paying? If a good price is offered, we can deal.',
  },
];

//

const ChatBubbles = () => (
  <div>
    <div className="bg-slate-50 items-center">
      {bluemessages.map((msg) => (
        <div className="flex justify-end mx-5">
          <div className="bg-primary rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl w-auto my-3">
            <div className="card-body py-4 px-6">
              <p className="min-w-fit max-w-sm">{msg.message}</p>
            </div>
          </div>
        </div>
      ))}

      {greymessages.map((msg) => (
        <div className="flex justify-start mx-5">
          <div className="bg-secondary rounded-tl-3xl rounded-tr-3xl rounded-br-3xl w-auto my-3">
            <div className="py-4 px-6">
              <p className="min-w-fit max-w-sm">{msg.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ChatBubbles;
