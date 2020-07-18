const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Place = require('./models/Place');
const {nanoid} = require('nanoid');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, user] = await User.create({
        username: 'jack',
        password: '123',
        role: 'admin',
        token: nanoid()
    }, {
        username: 'test',
        password: '123',
        role: 'user',
        token: nanoid()
    });

    await Place.create({
        title: 'Bulwar',
        image: 'bulwar.jpg',
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece ' +
            'of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin ' +
            'professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ' +
            'consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,' +
            ' discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus ' +
            'Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise ' +
            'on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum ' +
            'dolor sit amet..", comes from a line in section 1.10.32.',
        images: ['bulwar_in.jpg', 'cafe_side.jpeg'],
        user: admin
    }, {
        title: 'Sultan',
        image: 'sultan.jpg',
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece ' +
            'of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin ' +
            'professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ' +
            'consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,' +
            ' discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus ' +
            'Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise ' +
            'on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum ' +
            'dolor sit amet..", comes from a line in section 1.10.32.',
        images: ['outside.jpeg', 'sultanInSide.jpeg'],
        user: user
    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});
