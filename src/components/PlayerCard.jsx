// PlayerCard.js
import PropTypes from 'prop-types';
import { Batsman, Bowler, WicketKeeper, AllRounder, Franchise, Age, BlankGuess} from '../utils/design';
import { CountryFlag } from '../utils/TeamDesign';
const PlayerCard = ({ player, hero, isGuessed}) => (
  <div className={`w-20 md:w-32 font-inter text-xs md:text-base rounded-xl inter border design-text design-border ${isGuessed ? 'win-blue' : 'bg-design-white' }`}>
    <div className={`bg-head mb-2 py-2 font-bold design-text rounded-t-xl ${isGuessed ? 'win-blue-head' : 'default-head'}`}>
      <h3 className="text-base font-sans text-center font-bold inline-block">{hero.price}</h3>
    </div>
    <div className='' >
        <h3 className="inline-block h-8">{hero.role === 'BT' ? <Batsman /> : hero.role === 'BW' ? <Bowler /> : hero.role === 'AR' ? <AllRounder />: <WicketKeeper />}</h3>
        <p className={`text-xs font-sans design-text font-bold design-text-value my-4 ${isGuessed ? 'text-white' : ''}`}>
          {hero.role === 'BT' ? "BATSMAN" : hero.role === 'BW' ? "BOWLER" : hero.role === 'AR' ? "ALL ROUNDER": "WICKET KEEPER"}
        </p>
    </div>
    <div className="inline-block detail-color text-center">
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='font-sans  design-text'>
        <Franchise team={player.team} />
        <p style={{ marginTop: '-10px' }} className={`text-xs font-sans design-text font-bold design-text-value ${isGuessed ? 'text-white' : player.team ? 'design-text' : 'detail-color'}`}>
            {player.team ? player.team.toUpperCase() : 'TEAM'}
        </p>
    </div>
</div>
<div className="inline-block mr-2 text-2xl text-center md:pl-2 mb-3 font-luckiest-guy ">
  <p style={{ margin: '0', padding: '0' }}>
    {player.age ? 
      <p className={`font-luckiest-guy text-5xl pt-4 age font-bold ${player.age? '' : 'py-4'}`}>{player.age}</p> :
      <div className='pt-4'>
        <Age />
        <p style={{marginTop: '-15px'}} className='font-sans text-xs font-bold detail-color mt-1'>AGE</p>
      </div>
    }
  </p>
</div>

    <div className=" inline-block font-inter mt-4 text-center">
        <CountryFlag country={player.nation} />
        <p style={{ marginLeft: '5px', marginRight: '5px', marginTop:'-15px' }}className={`text-xs design-text-value font-inter font-bold inter ${isGuessed ? 'text-white' : player.nation ? 'design-text' : 'detail-color'}`} >{player.nation ? player.nation.toUpperCase() :''}</p>
    </div>
    <div className={`bg-head text-center px-4 w-30 mt-2 py-1 rounded-b-xl ${isGuessed ? 'win-blue-head mt-6' : 'default-head head'}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h3 className={`text-base font-bold inline-block`}>
        {player.playerName ? (
            <div className='h-full '>
                <span className='text-xs sm:text-sm md:text-base'>{player.playerName.split(' ')[0].toUpperCase()}</span>{' '} <br className="hidden sm:inline" />
                <span className='text-base font-inter font-bold sm:text-sm md:text-base'>{player.playerName.split(' ')[1].toUpperCase()}</span>
            </div>
        ) : <div className=''><BlankGuess /></div> }
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
