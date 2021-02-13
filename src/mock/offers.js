export const offers = [
  {
    id: 1,
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Amsterdam`
    },
    description: `A quiet cozy and picturesque that hides behind
      a river by the unique lightness of Amsterdam.
      The building is green and from 18th century. An independent House,
      strategically located between Rembrand Square and National Opera,
      but where the bustle of the city comes to rest
      in this alley flowery and colorful.`,
    goods: [`Wifi`, `Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      id: 3,
      avatarUrl: `img/avatar-angelina.jpg`,
      isPro: false,
      name: `Mette`
    },
    images: [
      `img/room.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-01.jpg`
    ],
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: `img/apartment-01.jpg`,
    price: 120,
    rating: 4.8,
    title: `Beautiful & luxurious studio at great location`,
    type: `apartment`
  },
  {
    id: 2,
    bedrooms: 1,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Amsterdam`
    },
    description: `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    goods: [`Wifi`, `Heating`, `Cable TV`, `Washing machine`],
    host: {
      id: 4,
      avatarUrl: `img/avatar-angelina.jpg`,
      isPro: true,
      name: `Jenny`
    },
    images: [`img/apartment-03.jpg`, `img/studio-01.jpg`],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 2,
    previewImage: `img/room.jpg`,
    price: 80,
    rating: 3.6,
    title: `Wood and stone place`,
    type: `private room`
  },
  {
    id: 3,
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Amsterdam`
    },
    description: `A quiet cozy and picturesque that hides behind
      a river by the unique lightness of Amsterdam. An independent House,
      strategically located between Rembrand Square and National Opera,
      but where the bustle of the city comes to rest in this alley flowery
      and colorful.`,
    goods: [`Wifi`, `Heating`, `Kitchen`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      id: 5,
      avatarUrl: `img/avatar-angelina.jpg`,
      isPro: true,
      name: `Angelina`
    },
    images: [`img/apartment-01.jpg`, `img/apartment-01.jpg`],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: `img/apartment-02.jpg`,
    price: 132,
    rating: 4.0,
    title: `Canal View Prinsengracht`,
    type: `house`
  },
  {
    id: 4,
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Cologne`
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Dishwasher`],
    host: {
      id: 6,
      avatarUrl: `img/avatar-max.jpg`,
      isPro: true,
      name: `Søren`
    },
    images: [`img/apartment-03.jpg`, `img/studio-01.jpg`],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: `img/apartment-03.jpg`,
    price: 180,
    rating: 4.9,
    title: `Nice, cozy, warm big bed apartment`,
    type: `hotel`
  },
];
