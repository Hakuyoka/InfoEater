/**
 * Created by kotato on 2017/02/27.
 */



class InfoEater{

    constructor(name, data, digest, ingest, evacuate, divide){
        this.name = name
        this.data = data
        this.ingester = new ingest()
        this.digester = new digest()
        this.resouces = new NutrientStorage()
        this.evacuater = new evacuate()
        this.divide = new divide()
    }

    eat(data){
        this.resouces.store(this.digester.digest(this.ingester.ingest(data)))
    }

    lifeCycle(data){
        this.eat(data)
        this.evacuater.evacuate(this.resouces.getResources())
        this.divide(this.resouces.getResources())
    }

}

class NutrientStorage{

    constructor() {
        this.resources = []
        this.counter = 0
        this.components = {}
    }

    store(data){
        this.resources.append({date: new Date(), data:data, id:this.counter++})
        return this.resources
    }

    getResources(){
        return this.resources
    }

}


class Ingester{

    constructor(ingesting){
        this.ingesting = ingesting
    }

    ingest(data){
        return this.ingesting(data)
    }


}

class Digester{

    constructor(digesting){
        this.digesting = digesting
    }

    digest(data){
        return this.digesting()
    }
}

class Evacuate{
    constructor(evacuateing){
        this.evacuateing = evacuateing
    }

    evacuate(data){
        return this.evacuateing()
    }
}


module.exports = {
    InfoEater:InfoEater,
    NutrientStorage:NutrientStorage,
    Ingester:Ingester,
    Digester:Digester,
    Evacuate:Evacuate,
}