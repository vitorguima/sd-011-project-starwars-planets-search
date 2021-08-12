import React, { useState } from 'react';
import '../styles/greetings.css';

export default function Greetings() {
  const [rndDiv, setRndDiv] = useState([true, false]);
  const renderGreetings = () => {
    if (rndDiv[0] === true) {
      setRndDiv([false, true]);
    } else {
      setRndDiv([true, false]);
    }
  };

  return (
    <div className="container-greetings">
      <div hidden={ rndDiv[1] }>
        <h1>Greetings</h1>
        <p>
          Estudar na Trybe é desafiador. Lembro-me de ouvir o Matheus Goyas, no
          primeiro dia do curso, dizer que o processo de aprender não seria fácil
          e que em muitos momentos seria doloroso. Este projeto, Star Wars, foi um
          desses momentos dolorosos. Se não fosse a colaboração de colegas que
          estavam dispostos a doar muito de seu tempo com certeza não teria entregue
          esta tarefa. Fiz esta pequena homenagem para me lembrar das pessoas que
          tão gentilmente fizeram muito por mim. Muitíssimo obrigado!!!
        </p>
      </div>
      <div hidden={ rndDiv[0] }>
        <ul>
          <li>Arlesson Moura</li>
          <li>Victor Faria</li>
          <li>Ana Clara Kyotoku</li>
          <li>Alberto Candido</li>
          <li>Vinicius Gouveia</li>
          <li>Tales Coelho</li>
          <li>Igor Mendes</li>
        </ul>
      </div>
      <button
        type="button"
        className="btn-greetings"
        onClick={ renderGreetings }
      >
        Clique para ver
      </button>
    </div>
  );
}
