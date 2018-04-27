import React, { Component } from 'react'
//import './InterestPage.css';
//import inter from '../Interests/ints'; 
import Search from './Search';
import OptionList from './OptionList';
import InterestList from './InterestList';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AuthUserContext from '../../AuthUserContext';
import withAuthorization from '../../withAuthorization';
import { auth, fs } from '../../firebase';

import * as routes from '../../constants';
import './interestList.css';

//require('normalize-css');


const inter =  [
  {
    id: 0,
    inter: '3D printing'
    },
    {
    id: 1,
    inter: 'Acting'
    },
    {
    id: 2,
    inter: 'Aeromodeling'
    },
    {
    id: 3,
    inter: 'Air sports'
    },
    {
    id: 4,
    inter: 'Airbrushing'
    },
    {
    id: 5,
    inter: 'Aircraft Spotting'
    },
    {
    id: 6,
    inter: 'Airsoft'
    },
    {
    id: 7,
    inter: 'Airsofting'
    },
    {
    id: 8,
    inter: 'Amateur astronomy'
    },
    {
    id: 9,
    inter: 'Amateur geology'
    },
    {
    id: 10,
    inter: 'Amateur Radio'
    },
    {
    id: 11,
    inter: 'American football'
    },
    {
    id: 12,
    inter: 'Animal fancy'
    },
    {
    id: 13,
    inter: 'Animals/pets/dogs'
    },
    {
    id: 14,
    inter: 'Antiquing'
    },
    {
    id: 15,
    inter: 'Antiquities'
    },
    {
    id: 16,
    inter: 'Aqua-lung'
    },
    {
    id: 17,
    inter: 'Aquarium (Freshwater & Saltwater)'
    },
    {
    id: 18,
    inter: 'Archery'
    },
    {
    id: 19,
    inter: 'Art collecting'
    },
    {
    id: 20,
    inter: 'Arts'
    },
    {
    id: 21,
    inter: 'Association football'
    },
    {
    id: 22,
    inter: 'Astrology'
    },
    {
    id: 23,
    inter: 'Astronomy'
    },
    {
    id: 24,
    inter: 'Audiophilia'
    },
    {
    id: 25,
    inter: 'Australian rules football'
    },
    {
    id: 26,
    inter: 'Auto audiophilia'
    },
    {
    id: 27,
    inter: 'Auto racing'
    },
    {
    id: 28,
    inter: 'Backgammon'
    },
    {
    id: 29,
    inter: 'Backpacking'
    },
    {
    id: 30,
    inter: 'Badminton'
    },
    {
    id: 31,
    inter: 'Base Jumping'
    },
    {
    id: 32,
    inter: 'Baseball'
    },
    {
    id: 33,
    inter: 'Basketball'
    },
    {
    id: 34,
    inter: 'Baton Twirling'
    },
    {
    id: 35,
    inter: 'Beach Volleyball'
    },
    {
    id: 36,
    inter: 'Beach/Sun tanning'
    },
    {
    id: 37,
    inter: 'Beachcombing'
    },
    {
    id: 38,
    inter: 'Beadwork'
    },
    {
    id: 39,
    inter: 'Beatboxing'
    },
    {
    id: 40,
    inter: 'Becoming A Child Advocate'
    },
    {
    id: 41,
    inter: 'Beekeeping'
    },
    {
    id: 42,
    inter: 'Bell Ringing'
    },
    {
    id: 43,
    inter: 'Belly Dancing'
    },
    {
    id: 44,
    inter: 'Bicycle Polo'
    },
    {
    id: 45,
    inter: 'Bicycling'
    },
    {
    id: 46,
    inter: 'Billiards'
    },
    {
    id: 47,
    inter: 'Bird watching'
    },
    {
    id: 48,
    inter: 'Birding'
    },
    {
    id: 49,
    inter: 'Birdwatching'
    },
    {
    id: 50,
    inter: 'Blacksmithing'
    },
    {
    id: 51,
    inter: 'Blogging'
    },
    {
    id: 52,
    inter: 'BMX'
    },
    {
    id: 53,
    inter: 'Board games'
    },
    {
    id: 54,
    inter: 'Board sports'
    },
    {
    id: 55,
    inter: 'BoardGames'
    },
    {
    id: 56,
    inter: 'Boating'
    },
    {
    id: 57,
    inter: 'Body Building'
    },
    {
    id: 58,
    inter: 'Bodybuilding'
    },
    {
    id: 59,
    inter: 'Bonsai Tree'
    },
    {
    id: 60,
    inter: 'Book collecting'
    },
    {
    id: 61,
    inter: 'Bookbinding'
    },
    {
    id: 62,
    inter: 'Boomerangs'
    },
    {
    id: 63,
    inter: 'Bowling'
    },
    {
    id: 64,
    inter: 'Boxing'
    },
    {
    id: 65,
    inter: 'Brazilian jiu-jitsu'
    },
    {
    id: 66,
    inter: 'Breakdancing'
    },
    {
    id: 67,
    inter: 'Brewing Beer'
    },
    {
    id: 68,
    inter: 'Bridge'
    },
    {
    id: 69,
    inter: 'Bridge Building'
    },
    {
    id: 70,
    inter: 'Bringing Food To The Disabled'
    },
    {
    id: 71,
    inter: 'Building A House For Habitat For Humanity'
    },
    {
    id: 72,
    inter: 'Building Dollhouses'
    },
    {
    id: 73,
    inter: 'Bus spotting'
    },
    {
    id: 74,
    inter: 'Butterfly Watching'
    },
    {
    id: 75,
    inter: 'Button Collecting'
    },
    {
    id: 76,
    inter: 'Cake Decorating'
    },
    {
    id: 77,
    inter: 'Calligraphy'
    },
    {
    id: 78,
    inter: 'Camping'
    },
    {
    id: 79,
    inter: 'Candle making'
    },
    {
    id: 80,
    inter: 'Canoeing'
    },
    {
    id: 81,
    inter: 'Car Racing'
    },
    {
    id: 82,
    inter: 'Card collecting'
    },
    {
    id: 83,
    inter: 'Cartooning'
    },
    {
    id: 84,
    inter: 'Casino Gambling'
    },
    {
    id: 85,
    inter: 'Cave Diving'
    },
    {
    id: 86,
    inter: 'Ceramics'
    },
    {
    id: 87,
    inter: 'Cheerleading'
    },
    {
    id: 88,
    inter: 'Chess'
    },
    {
    id: 89,
    inter: 'Church/church activities'
    },
    {
    id: 90,
    inter: 'Cigar Smoking'
    },
    {
    id: 91,
    inter: 'Climbing'
    },
    {
    id: 92,
    inter: 'Cloud Watching'
    },
    {
    id: 93,
    inter: 'Coin Collecting'
    },
    {
    id: 94,
    inter: 'Collecting'
    },
    {
    id: 95,
    inter: 'Collecting Antiques'
    },
    {
    id: 96,
    inter: 'Collecting Artwork'
    },
    {
    id: 97,
    inter: 'Collecting Hats'
    },
    {
    id: 98,
    inter: 'Collecting Music Albums'
    },
    {
    id: 99,
    inter: 'Collecting RPM Records'
    },
    {
    id: 100,
    inter: 'Collecting Sports Cards (Baseball, Football, Basketball, Hockey)'
    },
    {
    id: 101,
    inter: 'Collecting Swords'
    },
    {
    id: 102,
    inter: 'Color guard'
    },
    {
    id: 103,
    inter: 'Coloring'
    },
    {
    id: 104,
    inter: 'Comic book collecting'
    },
    {
    id: 105,
    inter: 'Compose Music'
    },
    {
    id: 106,
    inter: 'Computer activities'
    },
    {
    id: 107,
    inter: 'Computer programming'
    },
    {
    id: 108,
    inter: 'Conworlding'
    },
    {
    id: 109,
    inter: 'Cooking'
    },
    {
    id: 110,
    inter: 'Cosplay'
    },
    {
    id: 111,
    inter: 'Cosplaying'
    },
    {
    id: 112,
    inter: 'Couponing'
    },
    {
    id: 113,
    inter: 'Crafts'
    },
    {
    id: 114,
    inter: 'Crafts (unspecified)'
    },
    {
    id: 115,
    inter: 'Creative writing'
    },
    {
    id: 116,
    inter: 'Cricket'
    },
    {
    id: 117,
    inter: 'Crochet'
    },
    {
    id: 118,
    inter: 'Crocheting'
    },
    {
    id: 119,
    inter: 'Cross-Stitch'
    },
    {
    id: 120,
    inter: 'Crossword Puzzles'
    },
    {
    id: 121,
    inter: 'Cryptography'
    },
    {
    id: 122,
    inter: 'Curling'
    },
    {
    id: 123,
    inter: 'Cycling'
    },
    {
    id: 124,
    inter: 'Dance'
    },
    {
    id: 125,
    inter: 'Dancing'
    },
    {
    id: 126,
    inter: 'Darts'
    },
    {
    id: 127,
    inter: 'Debate'
    },
    {
    id: 128,
    inter: 'Deltiology (postcard collecting)'
    },
    {
    id: 129,
    inter: 'Diecast Collectibles'
    },
    {
    id: 130,
    inter: 'Digital arts'
    },
    {
    id: 131,
    inter: 'Digital Photography'
    },
    {
    id: 132,
    inter: 'Disc golf'
    },
    {
    id: 133,
    inter: 'Do it yourself'
    },
    {
    id: 134,
    inter: 'Dodgeball'
    },
    {
    id: 135,
    inter: 'Dog sport'
    },
    {
    id: 136,
    inter: 'Dolls'
    },
    {
    id: 137,
    inter: 'Dominoes'
    },
    {
    id: 138,
    inter: 'Dowsing'
    },
    {
    id: 139,
    inter: 'Drama'
    },
    {
    id: 140,
    inter: 'Drawing'
    },
    {
    id: 141,
    inter: 'Driving'
    },
    {
    id: 142,
    inter: 'Dumpster Diving'
    },
    {
    id: 143,
    inter: 'Eating out'
    },
    {
    id: 144,
    inter: 'Educational Courses'
    },
    {
    id: 145,
    inter: 'Electronics'
    },
    {
    id: 146,
    inter: 'Element collecting'
    },
    {
    id: 147,
    inter: 'Embroidery'
    },
    {
    id: 148,
    inter: 'Entertaining'
    },
    {
    id: 149,
    inter: 'Equestrianism'
    },
    {
    id: 150,
    inter: 'Exercise (aerobics, weights)'
    },
    {
    id: 151,
    inter: 'Exhibition drill'
    },
    {
    id: 152,
    inter: 'Falconry'
    },
    {
    id: 153,
    inter: 'Fast cars'
    },
    {
    id: 154,
    inter: 'Felting'
    },
    {
    id: 155,
    inter: 'Fencing'
    },
    {
    id: 156,
    inter: 'Field hockey'
    },
    {
    id: 157,
    inter: 'Figure skating'
    },
    {
    id: 158,
    inter: 'Fire Poi'
    },
    {
    id: 159,
    inter: 'Fishing'
    },
    {
    id: 160,
    inter: 'Fishkeeping'
    },
    {
    id: 161,
    inter: 'Flag Football'
    },
    {
    id: 162,
    inter: 'Floorball'
    },
    {
    id: 163,
    inter: 'Floral Arrangements'
    },
    {
    id: 164,
    inter: 'Flower arranging'
    },
    {
    id: 165,
    inter: 'Flower collecting and pressing'
    },
    {
    id: 166,
    inter: 'Fly Tying'
    },
    {
    id: 167,
    inter: 'Flying'
    },
    {
    id: 168,
    inter: 'Footbag'
    },
    {
    id: 169,
    inter: 'Football'
    },
    {
    id: 170,
    inter: 'Foraging'
    },
    {
    id: 171,
    inter: 'Foreign language learning'
    },
    {
    id: 172,
    inter: 'Fossil hunting'
    },
    {
    id: 173,
    inter: 'Four Wheeling'
    },
    {
    id: 174,
    inter: 'Freshwater Aquariums'
    },
    {
    id: 175,
    inter: 'Frisbee Golf – Frolf'
    },
    {
    id: 176,
    inter: 'Gambling'
    },
    {
    id: 177,
    inter: 'Games'
    },
    {
    id: 178,
    inter: 'Gaming (tabletop games and role-playing games)'
    },
    {
    id: 179,
    inter: 'Garage Saleing'
    },
    {
    id: 180,
    inter: 'Gardening'
    },
    {
    id: 181,
    inter: 'Genealogy'
    },
    {
    id: 182,
    inter: 'Geocaching'
    },
    {
    id: 183,
    inter: 'Ghost hunting'
    },
    {
    id: 184,
    inter: 'Glassblowing'
    },
    {
    id: 185,
    inter: 'Glowsticking'
    },
    {
    id: 186,
    inter: 'Gnoming'
    },
    {
    id: 187,
    inter: 'Go'
    },
    {
    id: 188,
    inter: 'Go Kart Racing'
    },
    {
    id: 189,
    inter: 'Going to movies'
    },
    {
    id: 190,
    inter: 'Golf'
    },
    {
    id: 191,
    inter: 'Golfing'
    },
    {
    id: 192,
    inter: 'Gongoozling'
    },
    {
    id: 193,
    inter: 'Graffiti'
    },
    {
    id: 194,
    inter: 'Grip Strength'
    },
    {
    id: 195,
    inter: 'Guitar'
    },
    {
    id: 196,
    inter: 'Gun Collecting'
    },
    {
    id: 197,
    inter: 'Gunsmithing'
    },
    {
    id: 198,
    inter: 'Gymnastics'
    },
    {
    id: 199,
    inter: 'Gyotaku'
    },
    {
    id: 200,
    inter: 'Handball'
    },
    {
    id: 201,
    inter: 'Handwriting Analysis'
    },
    {
    id: 202,
    inter: 'Hang gliding'
    },
    {
    id: 203,
    inter: 'Herping'
    },
    {
    id: 204,
    inter: 'Hiking'
    },
    {
    id: 205,
    inter: 'Home Brewing'
    },
    {
    id: 206,
    inter: 'Home Repair'
    },
    {
    id: 207,
    inter: 'Home Theater'
    },
    {
    id: 208,
    inter: 'Homebrewing'
    },
    {
    id: 209,
    inter: 'Hooping'
    },
    {
    id: 210,
    inter: 'Horse riding'
    },
    {
    id: 211,
    inter: 'Hot air ballooning'
    },
    {
    id: 212,
    inter: 'Hula Hooping'
    },
    {
    id: 213,
    inter: 'Hunting'
    },
    {
    id: 214,
    inter: 'Ice hockey'
    },
    {
    id: 215,
    inter: 'Ice skating'
    },
    {
    id: 216,
    inter: 'Iceskating'
    },
    {
    id: 217,
    inter: 'Illusion'
    },
    {
    id: 218,
    inter: 'Impersonations'
    },
    {
    id: 219,
    inter: 'Inline skating'
    },
    {
    id: 220,
    inter: 'Insect collecting'
    },
    {
    id: 221,
    inter: 'Internet'
    },
    {
    id: 222,
    inter: 'Inventing'
    },
    {
    id: 223,
    inter: 'Jet Engines'
    },
    {
    id: 224,
    inter: 'Jewelry Making'
    },
    {
    id: 225,
    inter: 'Jigsaw Puzzles'
    },
    {
    id: 226,
    inter: 'Jogging'
    },
    {
    id: 227,
    inter: 'Judo'
    },
    {
    id: 228,
    inter: 'Juggling'
    },
    {
    id: 229,
    inter: 'Jukskei'
    },
    {
    id: 230,
    inter: 'Jump Roping'
    },
    {
    id: 231,
    inter: 'Kabaddi'
    },
    {
    id: 232,
    inter: 'Kart racing'
    },
    {
    id: 233,
    inter: 'Kayaking'
    },
    {
    id: 234,
    inter: 'Keep A Journal'
    },
    {
    id: 235,
    inter: 'Kitchen Chemistry'
    },
    {
    id: 236,
    inter: 'Kite Boarding'
    },
    {
    id: 237,
    inter: 'Kite flying'
    },
    {
    id: 238,
    inter: 'Kites'
    },
    {
    id: 239,
    inter: 'Kitesurfing'
    },
    {
    id: 240,
    inter: 'Knapping'
    },
    {
    id: 241,
    inter: 'Knife making'
    },
    {
    id: 242,
    inter: 'Knife throwing'
    },
    {
    id: 243,
    inter: 'Knitting'
    },
    {
    id: 244,
    inter: 'Knotting'
    },
    {
    id: 245,
    inter: 'Lacemaking'
    },
    {
    id: 246,
    inter: 'Lacrosse'
    },
    {
    id: 247,
    inter: 'Lapidary'
    },
    {
    id: 248,
    inter: 'LARPing'
    },
    {
    id: 249,
    inter: 'Laser tag'
    },
    {
    id: 250,
    inter: 'Lasers'
    },
    {
    id: 251,
    inter: 'Lawn Darts'
    },
    {
    id: 252,
    inter: 'Learn to Play Poker'
    },
    {
    id: 253,
    inter: 'Learning A Foreign Language'
    },
    {
    id: 254,
    inter: 'Learning An Instrument'
    },
    {
    id: 255,
    inter: 'Learning To Pilot A Plane'
    },
    {
    id: 256,
    inter: 'Leather crafting'
    },
    {
    id: 257,
    inter: 'Leathercrafting'
    },
    {
    id: 258,
    inter: 'Lego building'
    },
    {
    id: 259,
    inter: 'Legos'
    },
    {
    id: 260,
    inter: 'Letterboxing'
    },
    {
    id: 261,
    inter: 'Listening to music'
    },
    {
    id: 262,
    inter: 'Locksport'
    },
    {
    id: 263,
    inter: 'Machining'
    },
    {
    id: 264,
    inter: 'Macramé'
    },
    {
    id: 265,
    inter: 'Macrame'
    },
    {
    id: 266,
    inter: 'Magic'
    },
    {
    id: 267,
    inter: 'Mahjong'
    },
    {
    id: 268,
    inter: 'Making Model Cars'
    },
    {
    id: 269,
    inter: 'Marbles'
    },
    {
    id: 270,
    inter: 'Marksmanship'
    },
    {
    id: 271,
    inter: 'Martial arts'
    },
    {
    id: 272,
    inter: 'Matchstick Modeling'
    },
    {
    id: 273,
    inter: 'Meditation'
    },
    {
    id: 274,
    inter: 'Metal detecting'
    },
    {
    id: 275,
    inter: 'Meteorology'
    },
    {
    id: 276,
    inter: 'Microscopy'
    },
    {
    id: 277,
    inter: 'Mineral collecting'
    },
    {
    id: 278,
    inter: 'Model aircraft'
    },
    {
    id: 279,
    inter: 'Model building'
    },
    {
    id: 280,
    inter: 'Model Railroading'
    },
    {
    id: 281,
    inter: 'Model Rockets'
    },
    {
    id: 282,
    inter: 'Modeling Ships'
    },
    {
    id: 283,
    inter: 'Models'
    },
    {
    id: 284,
    inter: 'Motor sports'
    },
    {
    id: 285,
    inter: 'Motorcycles'
    },
    {
    id: 286,
    inter: 'Mountain Biking'
    },
    {
    id: 287,
    inter: 'Mountain Climbing'
    },
    {
    id: 288,
    inter: 'Mountaineering'
    },
    {
    id: 289,
    inter: 'Movie and movie memorabilia collecting'
    },
    {
    id: 290,
    inter: 'Mushroom hunting/Mycology'
    },
    {
    id: 291,
    inter: 'Musical Instruments'
    },
    {
    id: 292,
    inter: 'Nail Art'
    },
    {
    id: 293,
    inter: 'Needlepoint'
    },
    {
    id: 294,
    inter: 'Netball'
    },
    {
    id: 295,
    inter: 'Nordic skating'
    },
    {
    id: 296,
    inter: 'Orienteering'
    },
    {
    id: 297,
    inter: 'Origami'
    },
    {
    id: 298,
    inter: 'Owning An Antique Car'
    },
    {
    id: 299,
    inter: 'Paintball'
    },
    {
    id: 300,
    inter: 'Painting'
    },
    {
    id: 301,
    inter: 'Papermache'
    },
    {
    id: 302,
    inter: 'Papermaking'
    },
    {
    id: 303,
    inter: 'Parachuting'
    },
    {
    id: 304,
    inter: 'Paragliding or Power Paragliding'
    },
    {
    id: 305,
    inter: 'Parkour'
    },
    {
    id: 306,
    inter: 'People Watching'
    },
    {
    id: 307,
    inter: 'Photography'
    },
    {
    id: 308,
    inter: 'Piano'
    },
    {
    id: 309,
    inter: 'Pigeon racing'
    },
    {
    id: 310,
    inter: 'Pinochle'
    },
    {
    id: 311,
    inter: 'Pipe Smoking'
    },
    {
    id: 312,
    inter: 'Planking'
    },
    {
    id: 313,
    inter: 'Playing music'
    },
    {
    id: 314,
    inter: 'Playing musical instruments'
    },
    {
    id: 315,
    inter: 'Playing team sports'
    },
    {
    id: 316,
    inter: 'Poker'
    },
    {
    id: 317,
    inter: 'Pole Dancing'
    },
    {
    id: 318,
    inter: 'Polo'
    },
    {
    id: 319,
    inter: 'Pottery'
    },
    {
    id: 320,
    inter: 'Powerboking'
    },
    {
    id: 321,
    inter: 'Protesting'
    },
    {
    id: 322,
    inter: 'Puppetry'
    },
    {
    id: 323,
    inter: 'Puzzles'
    },
    {
    id: 324,
    inter: 'Pyrotechnics'
    },
    {
    id: 325,
    inter: 'Quilting'
    },
    {
    id: 326,
    inter: 'R/C Boats'
    },
    {
    id: 327,
    inter: 'R/C Cars'
    },
    {
    id: 328,
    inter: 'R/C Helicopters'
    },
    {
    id: 329,
    inter: 'R/C Planes'
    },
    {
    id: 330,
    inter: 'Racing Pigeons'
    },
    {
    id: 331,
    inter: 'Racquetball'
    },
    {
    id: 332,
    inter: 'Radio-controlled car racing'
    },
    {
    id: 333,
    inter: 'Rafting'
    },
    {
    id: 334,
    inter: 'Railfans'
    },
    {
    id: 335,
    inter: 'Rappelling'
    },
    {
    id: 336,
    inter: 'Rapping'
    },
    {
    id: 337,
    inter: 'Reading'
    },
    {
    id: 338,
    inter: 'Reading To The Elderly'
    },
    {
    id: 339,
    inter: 'Record collecting'
    },
    {
    id: 340,
    inter: 'Relaxing'
    },
    {
    id: 341,
    inter: 'Renaissance Faire'
    },
    {
    id: 342,
    inter: 'Renting movies'
    },
    {
    id: 343,
    inter: 'Rescuing Abused Or Abandoned Animals'
    },
    {
    id: 344,
    inter: 'Robotics'
    },
    {
    id: 345,
    inter: 'Rock balancing'
    },
    {
    id: 346,
    inter: 'Rock climbing'
    },
    {
    id: 347,
    inter: 'Rock Collecting'
    },
    {
    id: 348,
    inter: 'Rockets'
    },
    {
    id: 349,
    inter: 'Rocking AIDS Babies'
    },
    {
    id: 350,
    inter: 'Roleplaying'
    },
    {
    id: 351,
    inter: 'Roller derby'
    },
    {
    id: 352,
    inter: 'Roller skating'
    },
    {
    id: 353,
    inter: 'Rugby'
    },
    {
    id: 354,
    inter: 'Rugby league football'
    },
    {
    id: 355,
    inter: 'Running'
    },
    {
    id: 356,
    inter: 'Sailing'
    },
    {
    id: 357,
    inter: 'Saltwater Aquariums'
    },
    {
    id: 358,
    inter: 'Sand art'
    },
    {
    id: 359,
    inter: 'Sand Castles'
    },
    {
    id: 360,
    inter: 'Scrapbooking'
    },
    {
    id: 361,
    inter: 'Scuba diving'
    },
    {
    id: 362,
    inter: 'Sculling or Rowing'
    },
    {
    id: 363,
    inter: 'Sculpting'
    },
    {
    id: 364,
    inter: 'Sea glass collecting'
    },
    {
    id: 365,
    inter: 'Seashell collecting'
    },
    {
    id: 366,
    inter: 'Self Defense'
    },
    {
    id: 367,
    inter: 'Sewing'
    },
    {
    id: 368,
    inter: 'Shark Fishing'
    },
    {
    id: 369,
    inter: 'Shooting'
    },
    {
    id: 370,
    inter: 'Shooting sport'
    },
    {
    id: 371,
    inter: 'Shopping'
    },
    {
    id: 372,
    inter: 'Shortwave listening'
    },
    {
    id: 373,
    inter: 'Singing'
    },
    {
    id: 374,
    inter: 'Singing In Choir'
    },
    {
    id: 375,
    inter: 'Skateboarding'
    },
    {
    id: 376,
    inter: 'Skeet Shooting'
    },
    {
    id: 377,
    inter: 'Sketching'
    },
    {
    id: 378,
    inter: 'Skiing'
    },
    {
    id: 379,
    inter: 'Skimboarding'
    },
    {
    id: 380,
    inter: 'Sky Diving'
    },
    {
    id: 381,
    inter: 'Skydiving'
    },
    {
    id: 382,
    inter: 'Slack Lining'
    },
    {
    id: 383,
    inter: 'Slacklining'
    },
    {
    id: 384,
    inter: 'Sleeping'
    },
    {
    id: 385,
    inter: 'Slingshots'
    },
    {
    id: 386,
    inter: 'Slot car racing'
    },
    {
    id: 387,
    inter: 'Snorkeling'
    },
    {
    id: 388,
    inter: 'Snowboarding'
    },
    {
    id: 389,
    inter: 'Soap Making'
    },
    {
    id: 390,
    inter: 'Soapmaking'
    },
    {
    id: 391,
    inter: 'Soccer'
    },
    {
    id: 392,
    inter: 'Socializing with friends/neighbors'
    },
    {
    id: 393,
    inter: 'Speed Cubing (rubix cube)'
    },
    {
    id: 394,
    inter: 'Speed skating'
    },
    {
    id: 395,
    inter: 'Spelunkering'
    },
    {
    id: 396,
    inter: 'Spending time with family/kids'
    },
    {
    id: 397,
    inter: 'Sports'
    },
    {
    id: 398,
    inter: 'Squash'
    },
    {
    id: 399,
    inter: 'Stamp Collecting'
    },
    {
    id: 400,
    inter: 'Stand-up comedy'
    },
    {
    id: 401,
    inter: 'Stone collecting'
    },
    {
    id: 402,
    inter: 'Stone skipping'
    },
    {
    id: 403,
    inter: 'Storm Chasing'
    },
    {
    id: 404,
    inter: 'Storytelling'
    },
    {
    id: 405,
    inter: 'String Figures'
    },
    {
    id: 406,
    inter: 'Sudoku'
    },
    {
    id: 407,
    inter: 'Surf Fishing'
    },
    {
    id: 408,
    inter: 'Surfing'
    },
    {
    id: 409,
    inter: 'Survival'
    },
    {
    id: 410,
    inter: 'Swimming'
    },
    {
    id: 411,
    inter: 'Table football'
    },
    {
    id: 412,
    inter: 'Table tennis'
    },
    {
    id: 413,
    inter: 'Taekwondo'
    },
    {
    id: 414,
    inter: 'Tai chi'
    },
    {
    id: 415,
    inter: 'Tatting'
    },
    {
    id: 416,
    inter: 'Taxidermy'
    },
    {
    id: 417,
    inter: 'Tea Tasting'
    },
    {
    id: 418,
    inter: 'Tennis'
    },
    {
    id: 419,
    inter: 'Tesla Coils'
    },
    {
    id: 420,
    inter: 'Tetris'
    },
    {
    id: 421,
    inter: 'Textiles'
    },
    {
    id: 422,
    inter: 'Texting'
    },
    {
    id: 423,
    inter: 'Tombstone Rubbing'
    },
    {
    id: 424,
    inter: 'Tool Collecting'
    },
    {
    id: 425,
    inter: 'Tour skating'
    },
    {
    id: 426,
    inter: 'Toy Collecting'
    },
    {
    id: 427,
    inter: 'Train Collecting'
    },
    {
    id: 428,
    inter: 'Train Spotting'
    },
    {
    id: 429,
    inter: 'Trainspotting'
    },
    {
    id: 430,
    inter: 'Traveling'
    },
    {
    id: 431,
    inter: 'Treasure Hunting'
    },
    {
    id: 432,
    inter: 'Trekkie'
    },
    {
    id: 433,
    inter: 'Triathlon'
    },
    {
    id: 434,
    inter: 'Tutoring Children'
    },
    {
    id: 435,
    inter: 'TV watching'
    },
    {
    id: 436,
    inter: 'Ultimate Frisbee'
    },
    {
    id: 437,
    inter: 'Urban exploration'
    },
    {
    id: 438,
    inter: 'Vehicle restoration'
    },
    {
    id: 439,
    inter: 'Video game collecting'
    },
    {
    id: 440,
    inter: 'Video Games'
    },
    {
    id: 441,
    inter: 'Video gaming'
    },
    {
    id: 442,
    inter: 'Videophilia'
    },
    {
    id: 443,
    inter: 'Vintage cars'
    },
    {
    id: 444,
    inter: 'Violin'
    },
    {
    id: 445,
    inter: 'Volleyball'
    },
    {
    id: 446,
    inter: 'Volunteer'
    },
    {
    id: 447,
    inter: 'Walking'
    },
    {
    id: 448,
    inter: 'Warhammer'
    },
    {
    id: 449,
    inter: 'Watching movies'
    },
    {
    id: 450,
    inter: 'Watching sporting events'
    },
    {
    id: 451,
    inter: 'Water sports'
    },
    {
    id: 452,
    inter: 'Weather Watcher'
    },
    {
    id: 453,
    inter: 'Web surfing'
    },
    {
    id: 454,
    inter: 'Weightlifting'
    },
    {
    id: 455,
    inter: 'Windsurfing'
    },
    {
    id: 456,
    inter: 'Wine Making'
    },
    {
    id: 457,
    inter: 'Wingsuit Flying'
    },
    {
    id: 458,
    inter: 'Wood carving'
    },
    {
    id: 459,
    inter: 'Woodworking'
    },
    {
    id: 460,
    inter: 'Working In A Food Pantry'
    },
    {
    id: 461,
    inter: 'Working on cars'
    },
    {
    id: 462,
    inter: 'World Record Breaking'
    },
    {
    id: 463,
    inter: 'Worldbuilding'
    },
    {
    id: 464,
    inter: 'Wrestling'
    },
    {
    id: 465,
    inter: 'Writing'
    },
    {
    id: 466,
    inter: 'Writing Music'
    },
    {
    id: 467,
    inter: 'Writing Songs'
    },
    {
    id: 468,
    inter: 'Yo-yoing'
    },
    {
    id: 469,
    inter: 'Yoga'
    },
    {
    id: 470,
    inter: 'YoYo'
    },
    {
    id: 471,
    inter: 'Ziplining'
    },
    {
    id: 472,
    inter: 'Zumba'
    }
]; 

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class InterestPage extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      initText: '',
       list: []

    };
  }

  addInterest(id) {
    const options = this.state.list.concat([id])
    this.setState({
     list: options
    });

    //console.log(this.state.list);

   }

   

   removeInterest(inter) {
    const { list } = this.state
    //list = list.slice(id)
    
    const id = list.indexOf(inter.id); 
    console.log('real id to be removed', id)
    //console.log('id to be removed', inter.id)
    const newList = list
    newList.splice(id,1)  
    this.setState({
      list: newList
    });
  }

  submitInt(event){
    console.log('submit');
    const sublist = []; 
    this.state.list.map( id =>{
      sublist.push(inter[id].inter); 
    })
    fs.updateUserInterests(this.props.authUser.uid, sublist);
    alert("Interests Updated");
    

  }
 

  update(val) {
    //var options = this.state.initText
   // const options = this.state.list.concat([3])
    this.setState({
      initText: val
     // list: options
    });
  }

  
  render() {
    //const options = this.state.list;
console.log('render', this.state.list)
//const inter = [1,2,3,4]
    return(
<div>
  <Search 
  initText={this.state.initText}
  update = {this.update.bind(this)}
  />

  
  <div >
  <main>
    <OptionList 
    picked = {this.state.list}
    intList = {inter}
    removeint = {this.removeInterest.bind(this)}
    submitInt = {this.submitInt.bind(this)}
     />

  <InterestList 
  inter={inter}
  initText = {this.state.initText}
  addint={this.addInterest.bind(this)}
  pickedList = {this.state.list}

  />

</main>

</div>
</div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});


const authCondition = (authUser) => !!authUser;


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(InterestPage);
