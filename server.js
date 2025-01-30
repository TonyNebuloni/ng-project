const express = require('express');
const app = express();
const port = 3000;
var cors = require('cors');
app.use(cors());


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);

const product = [ 
    {
        id: 0,
        name: 'Harry Potter',
        imageUrl: '/assets/images/harry.webp',
        isFavorite: false,
        createdDate: new Date(1980, 6, 31),
        taille: 36,
        prix: 39.99,
        maison: 'Gryffondor',
      },
      {
        id: 1,
        name: 'Ronald Weasley',
        imageUrl: '/assets/images/ron.webp',
        isFavorite: false,
        createdDate: new Date(1980, 3, 1),
        taille: 36,
        prix: 39.99,
        maison: 'Gryffondor',
      },
      {
        id: 2,
        name: 'Nymphadora Tonks',
        imageUrl: '/assets/images/nympha.webp',
        isFavorite: false,
        createdDate: new Date(1973, 8, 19),
        taille: 36,
        prix: 39.99,
        maison: 'Poufsouffle',
      },
      {
        id: 3,
        name: 'Neville Londubat',
        imageUrl: '/assets/images/neville.webp',
        isFavorite: false,
        createdDate: new Date(1980, 7, 30),
        taille: 36,
        prix: 39.99,
        maison: 'Gryffondor',
      },
      {
        id: 4,
        name: 'Albus Dumbledore',
        imageUrl: '/assets/images/albus.webp',
        isFavorite: false,
        createdDate: new Date(1881, 7, 30),
        taille: 36,
        prix: 39.99,
        maison: 'Gryffondor',
      },
      {
        id: 5,
        name: 'Severus Snape',
        imageUrl: '/assets/images/severus.webp',
        isFavorite: false,
        createdDate: new Date(1960, 1, 9),
        taille: 36,
        prix: 39.99,
        maison: 'Serpentard',
      },
      {
        id: 6,
        name: 'Draco Malfoy',
        imageUrl: '/assets/images/draco.webp',
        isFavorite: false,
        createdDate: new Date(1980, 5, 5),
        taille: 36,
        prix: 39.99,
        maison: 'Serpentard',
      },
      {
        id: 7,
        name: 'Luna Lovegood',
        imageUrl: '/assets/images/luna.webp',
        isFavorite: false,
        createdDate: new Date(1981, 2, 13),
        taille: 36,
        prix: 39.99,
        maison: 'Serdaigle',
      },
      {
        id: 8,
        name: 'Ginny Weasley',
        imageUrl: '/assets/images/ginny.webp',
        isFavorite: false,
        createdDate: new Date(1981, 7, 11),
        taille: 36,
        prix: 39.99,
        maison: 'Gryffondor',
      },
      {
        id: 9,
        name: 'Viktor Krum',
        imageUrl: '/assets/images/Viktor.webp',
        isFavorite: false,
        createdDate: new Date(1985, 5, 16),
        taille: 36,
        prix: 39.99,
        maison: 'Durmstrang',
      },
      {
        id: 10,
        name: 'Cho Chang',
        imageUrl: '/assets/images/cho.webp',
        isFavorite: false,
        createdDate: new Date(1987, 8, 8),
        taille: 36,
        prix: 39.99,
        maison: 'Serdaigle',
      },
      {
        id: 11,
        name: 'Minerva McGonagall',
        imageUrl: '/assets/images/minerva.webp',
        isFavorite: false,
        createdDate: new Date(1935, 9, 4),
        taille: 36,
        prix: 39.99,
        maison: 'Gryffondor',
      },
      {
        id: 12,
        name: 'Fleur Delacour',
        imageUrl: '/assets/images/Fleur.webp',
        isFavorite: false,
        createdDate: new Date(1992, 11, 30),
        taille: 36,
        prix: 39.99,
        maison: 'Beauxbâtons',
      },
      {
        id: 13,
        name: 'Sirius Black',
        imageUrl: '/assets/images/sirius.webp',
        isFavorite: false,
        createdDate: new Date(1960, 10, 11),
        taille: 36,
        prix: 39.99,
        maison: 'Gryffondor',
      },
      {
        id: 14,
        name: 'Remus Lupin',
        imageUrl: '/assets/images/remus.webp',
        isFavorite: false,
        createdDate: new Date(1960, 2, 10),
        taille: 36,
        prix: 39.99,
        maison: 'Gryffondor',
      },
]

app.get('/products', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(product);
});

app.get('/products/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json(product.find((p) => p.id == req.params.id))
});