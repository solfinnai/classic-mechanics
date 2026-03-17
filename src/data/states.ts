import { mechanics } from './mechanics';

export interface StateInfo {
  code: string;
  name: string;
  count: number;
  description: string;
}

export function getStatesWithCounts(): StateInfo[] {
  const stateCounts = mechanics.reduce((acc, mechanic) => {
    const state = mechanic.state;
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stateNames: Record<string, string> = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming'
  };

  const stateDescriptions: Record<string, string> = {
    'CA': 'Home to world-renowned restoration shops like Singer Vehicle Design and Icon 4x4, California leads the classic car scene.',
    'TX': 'The Lone Star State boasts a rich automotive heritage with specialists in muscle cars and custom builds.',
    'FL': 'Year-round driving weather makes Florida a paradise for classic car enthusiasts and restoration projects.',
    'MI': 'The heart of American automotive manufacturing, Michigan is home to authentic muscle car restoration experts.',
    'NY': 'From luxury exotics in Manhattan to vintage restorations upstate, New York serves discerning collectors.',
    'PA': 'Rich automotive history and skilled craftsmen make Pennsylvania a classic car restoration destination.',
    'OH': 'Ohio\'s automotive heritage includes specialized restoration of AMC vehicles and American classics.',
    'IL': 'Chicago and surrounding areas offer premier classic car restoration with Midwest values.',
    'NC': 'NASCAR country brings racing heritage and performance expertise to classic car restoration.',
    'GA': 'Atlanta\'s automotive scene combines Southern hospitality with high-quality restoration services.',
    'VA': 'Virginia\'s classic car shops blend traditional craftsmanship with modern restoration techniques.',
    'WA': 'Pacific Northwest restoration specialists excel in European imports and rust-free restorations.',
    'AZ': 'Desert climate preservation and expert restoration make Arizona ideal for classic car collectors.',
    'MA': 'New England\'s premier restoration facilities specialize in British marques and European classics.',
    'TN': 'Music City\'s classic car scene serves celebrities and collectors with custom builds and restorations.',
    'MO': 'Gateway to the West heritage and Route 66 connections make Missouri a classic car hub.',
    'WI': 'Wisconsin\'s restoration experts specialize in winter storage and Midwest muscle car heritage.',
    'MN': 'Twin Cities restoration facilities offer climate-controlled services and Scandinavian precision.',
    'CO': 'Mountain state specialists focus on high-altitude performance and all-weather classic builds.',
    'IN': 'Indianapolis racing heritage brings open-wheel expertise and performance restoration services.',
    'SC': 'Southern charm meets automotive excellence in South Carolina\'s coastal restoration facilities.',
    'OR': 'Portland\'s eco-conscious restoration scene specializes in air-cooled Porsches and Japanese classics.',
    'CT': 'Connecticut\'s restoration experts excel in British imports and New England classic preservation.',
    'IA': 'Heartland values and agricultural heritage define Iowa\'s classic truck and working vehicle restoration.',
    'KS': 'Aviation industry heritage brings precision craftsmanship to Kansas classic car restoration.',
    'NV': 'Las Vegas luxury restoration serves entertainment industry clients and exotic car collectors.',
    'NM': 'Desert preservation expertise and rust-free restoration make New Mexico a hidden gem.',
    'UT': 'Mountain west restoration specialists focus on high-altitude performance and all-season builds.',
    'NE': 'Great Plains heritage and agricultural expertise define Nebraska\'s classic restoration scene.',
    'AL': 'Deep South automotive heritage and NASCAR connections drive Alabama\'s restoration excellence.',
    'LA': 'Big Easy style and Mardi Gras heritage create Louisiana\'s unique classic car culture.',
    'ME': 'Down East coastal restoration experts specialize in salt air protection and maritime heritage.',
    'AR': 'Natural State charm and Ozark mountain heritage define Arkansas classic car restoration.',
    'DE': 'First State restoration facilities serve corporate heritage and executive classic collections.',
    'HI': 'Tropical paradise restoration specializes in salt air protection and island touring preparation.',
    'ID': 'Gem State restoration combines outdoor adventure heritage with mountain vehicle expertise.',
    'MT': 'Big Sky country restoration serves ranch heritage and heavy-duty classic vehicle needs.',
    'OK': 'Sooner State restoration combines oil field heritage with Route 66 classic car culture.'
  };

  return Object.entries(stateCounts)
    .map(([code, count]) => ({
      code,
      name: stateNames[code] || code,
      count,
      description: stateDescriptions[code] || `Classic car restoration services in ${stateNames[code] || code}.`
    }))
    .sort((a, b) => b.count - a.count);
}

export function getStateInfo(stateCode: string): StateInfo | null {
  const states = getStatesWithCounts();
  return states.find(s => s.code === stateCode) || null;
}