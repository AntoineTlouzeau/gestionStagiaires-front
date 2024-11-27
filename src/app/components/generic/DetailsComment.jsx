import React from 'react';

function DetailsComment({ text }) {
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index !== lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}

export default DetailsComment;
