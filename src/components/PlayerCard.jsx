// PlayerCard.js
import PropTypes from 'prop-types';
import { Batsman, Bowler, WicketKeeper, AllRounder, Franchise, Age, BlankGuess} from '../utils/design';
import { CountryFlag } from '../utils/TeamDesign';
const PlayerCard = ({ player, hero, isGuessed}) => (
    
  <div className={`w-20 md:w-32 text-xs md:text-base rounded-xl inter border design-text design-border ${isGuessed ? 'win-blue' : 'bg-design-white' }`}>
    <div className={`bg-head mb-2 rounded-t-xl ${isGuessed ? 'win-blue-head' : 'default-head'}`}>

      <h3 className="text-base font-bold inline-block">{hero.price}</h3>
    </div>
    <div >
        <h3 className="inline-block h-8">{hero.role === 'BT' ? <Batsman /> : hero.role === 'BW' ? <Bowler /> : hero.role === 'AR' ? <AllRounder />: <WicketKeeper />}</h3>
        <p className={`text-xs font-bold design-text-value my-4 ${isGuessed ? 'text-white' : ''}`}>
          {hero.role === 'BT' ? "BATSMAN" : hero.role === 'BW' ? "BOWLER" : hero.role === 'AR' ? "ALL ROUNDER": "WICKET KEEPER"}
        </p>
    </div>
    <div className="mb-3 inline-block text-white text-center">
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Franchise team={player.team} />
        <p style={{ marginLeft: '5px', marginRight: '5px', marginTop:'-15px' }}className={`text-xs text-white design-text-value font-bold inter ${player.team} ? '' ? '' `}>{player.team? player.team : 'TEAM'}</p>
    </div>
</div>
    <div className="inline-block mr-2 text-2xl text-center pl-2 mb-3">
        <Age />
      {/* <FaUser className="inline-block mr-2 text-2xl" /> */}
      <p style={{ marginLeft: '5px', marginRight: '5px', marginTop:'-15px' }}className='text-xs design-text-value custom-age font-bold inter'>{player.age ? '': ''}</p>
    </div>
    <div className=" inline-block text-center">
        <CountryFlag country={player.nation} />
        <p style={{ marginLeft: '5px', marginRight: '5px', marginTop:'-15px' }}className='text-xs design-text-value font-bold inter '>{player.nation ? '' :''}</p>
    </div>
    <div className={`bg-head text-center px-4 w-30 mt-2 py-1 rounded-b-xl ${isGuessed ? 'win-blue-head' : 'default-head'}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h3 className={`text-base font-bold inline-block`}>
        {player.playerName ? (
            <>
                <span className='text-xs'>{player.playerName.split(' ')[0]}</span>{' '} <br />
                <span className='text-base font-bold'>{player.playerName.split(' ')[1]}</span>
            </>
        ) : <span className='py-20'><BlankGuess /></span> }
    </h3>
</div>


  </div>
);

PlayerCard.propTypes = {
  player: PropTypes.shape({
    nation: PropTypes.string,
    team: PropTypes.string,
    age: PropTypes.string,
    playerName: PropTypes.string,
  }).isRequired,
  hero: PropTypes.shape({
    price: PropTypes.string.isRequired,
    role: PropTypes.string,
  }).isRequired,
  isGuessed: PropTypes.bool.isRequired
};

export default PlayerCard;
