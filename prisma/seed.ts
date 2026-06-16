import prisma from '../src/prisma.js';
import hiraganasArray from './hiraganas.json' with {type: "json"};

async function seedHiraganas() {
    // boucle + createMany ici
    try {
        const numberHiraganaDb = await prisma.hiragana.count()
        if (numberHiraganaDb === 0) {
            await prisma.hiragana.createMany({
                data: hiraganasArray
            })
        }else {
            return console.log('Db already seeded')
        }
    } catch{
        return console.log('Try error')
    }
}

seedHiraganas()