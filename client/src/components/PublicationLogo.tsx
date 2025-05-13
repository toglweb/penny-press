import React from 'react';
import { 
  SiCnn, SiNbc, SiCbs, SiVox, SiAxios, SiTheguardian
} from 'react-icons/si';
import { PiNewspaper } from 'react-icons/pi';

interface PublicationLogoProps {
  name: string;
}

// Mapping of publication names to their icons
interface PublicationConfig {
  icon: React.ReactNode;
}

const publicationConfigs: Record<string, PublicationConfig> = {
  'The New York Times': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'The Washington Post': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'The Wall Street Journal': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'Wall Street Journal': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'Los Angeles Times': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'USA Today': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'CNN': { 
    icon: <SiCnn className="h-6 w-6 text-gray-800" />
  },
  'Bloomberg News': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'Bloomberg': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'Reuters': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'Associated Press': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'NBC News': { 
    icon: <SiNbc className="h-6 w-6 text-gray-800" />
  },
  'ABC News': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'CBS News': { 
    icon: <SiCbs className="h-6 w-6 text-gray-800" />
  },
  'BBC News': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'BBC': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'The Guardian': { 
    icon: <SiTheguardian className="h-6 w-6 text-gray-800" />
  },
  'The Times': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'Al Jazeera': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'Le Monde': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'Der Spiegel': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'The Economist': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'Nikkei': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'South China Morning Post': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'Axios': { 
    icon: <SiAxios className="h-6 w-6 text-gray-800" />
  },
  'Politico': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'Vox': { 
    icon: <SiVox className="h-6 w-6 text-gray-800" />
  },
  'HuffPost': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'Business Insider': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  },
  'BuzzFeed News': { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  }
};

// Function to generate abbreviated name for publications without an icon
const getAbbreviation = (name: string) => {
  const words = name.split(' ');
  
  if (words.length === 1) {
    // For single word publications like "Axios" or "Vox"
    return name.length > 3 ? name.substring(0, 3) : name;
  } else if (words.length === 2) {
    // For two word publications like "Los Angeles", return first letters
    return words.map(word => word[0]).join('');
  } else {
    // For multi-word publications, use first letters of important words
    return words
      .filter(word => word.length > 2 && !['the', 'and', 'of'].includes(word.toLowerCase()))
      .map(word => word[0])
      .join('')
      .substring(0, 3);
  }
};

const PublicationLogo: React.FC<PublicationLogoProps> = ({ name }) => {
  const config = publicationConfigs[name] || { 
    icon: <PiNewspaper className="h-6 w-6 text-gray-800" />
  };
  
  const abbreviation = getAbbreviation(name);

  return (
    <div 
      className="publication-logo flex items-center justify-center text-gray-800 px-2 py-1 h-12 w-full"
      title={name}
    >
      {config.icon}
      <span className="ml-1 font-bold text-xs hidden sm:inline">{abbreviation}</span>
    </div>
  );
};

export default PublicationLogo;