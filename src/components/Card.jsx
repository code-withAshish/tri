import PropTypes from 'prop-types';
import { Batsman, Bowler, AllRounder, WicketKeeper, Franchise, Age, BlankGuess } from '../utils/design';
import { CountryFlag } from '../utils/TeamDesign';
const Card = ({ player, hero, isGuessed}) => {
  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-1 rounded-xl overflow-hidden ${isGuessed ? 'win-border' : 'design-border'}`}>
        <div className={`font-inter font-bold design-text p-2 ${isGuessed ? 'win-blue-head' : 'bg-head'}`}>{hero.price}</div>
        <div className={` flex flex-col design-text text-xs font-bold font-inter items-center justify-center p-4 ${isGuessed? 'win-blue' : 'bg-design-white'}`}>
            {hero.role === 'BT' ? 
            (
                <>
                <Batsman />
                <p>BATSMAN</p>
                </>   
            ) : hero.role === 'BW' ? (
                <>
                <Bowler />
                <p>BOWLER</p>
                </>
            ) : hero.role === 'AR' ? (
                <>
                <AllRounder />
                <p>ALL ROUNDER</p>
                </>
            ) : (
                <>
                <WicketKeeper />
                <p>WICKET KEEPER</p>
                </>
            )}
        </div>
        <div className={`flex flex-col design-text text-xs font-bold font-inter text-center items-center justify-center ${isGuessed? 'win-blue' : 'bg-design-white'}`}>
            <>
            <Franchise team={player.team} />
            <p className='py-1'>{player.team? player.team.toUpperCase() : (
                <p className='detail-color'>TEAM</p>
            )}</p>
            </>
        </div>
        <div className={` flex flex-col design-text text-xs font-bold font-inter text-center items-center justify-center ${isGuessed? 'win-blue' : 'bg-design-white'}`}>
            {player.age ? <p className='font-luckiest-guy age mt-3 text-5xl py-3 '>{player.age}</p> : (
                <>
                <Age />
                <p className='py-1'>{player.age? null : (
                    <p className='detail-color'>AGE</p>
                )}</p>
                </>
            )}
        </div>
        <div className={` flex flex-col design-text text-xs font-bold font-inter text-center items-center justify-center ${isGuessed? 'win-blue' : 'bg-design-white'}`}>
            <>
            <CountryFlag country={player.nation} />
            <p className='py-1'>{player.nation? player.nation.toUpperCase() : (
                <p className='detail-color'>NATION</p>
            )}</p>
            </> 
        </div>
        <div className={` py-2 ${isGuessed? 'win-blue-head' : 'bg-head'}`}>
            {isGuessed ? (
                <>
                <p className='text-xs pt-1 font-bold font-inter'>{player.playerName.split(' ')[0].toUpperCase()} <br />
                <span className='text-base'>{player.playerName.split(' ')[1].toUpperCase()}</span></p>
                </>
            ) : (
                <div className='md:px-8 px-7 py-1'><BlankGuess /></div>
            )}
        </div>
     </div>
    </>
  )
}

Card.propTypes = {
    player: PropTypes.shape({
      nation: PropTypes.string,
      team: PropTypes.string,
      age: PropTypes.number,
      playerName: PropTypes.string,
    }).isRequired,
    hero: PropTypes.shape({
      price: PropTypes.string.isRequired,
      role: PropTypes.string,
    }).isRequired,
    isGuessed: PropTypes.bool.isRequired
  };

export default Card
