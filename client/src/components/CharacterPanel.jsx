const CharacterPanel = () => {
  return (

    <div className="character-panel">

      <div className="panel-header">

        <h2>Characters</h2>

        <button className="create-character-btn">
          + Create Character
        </button>

      </div>


      <div className="character-list">

        <div className="character-card">

          <img
            src="https://placehold.co/100"
            alt=""
            className="character-image"
          />

          <div>

            <h3>Seraphina</h3>

            <p>
              Elf • Ranger
            </p>

            <p>
              Exiled noble from Valewood
            </p>

          </div>

        </div>

      </div>

    </div>

  );
};

export default CharacterPanel;