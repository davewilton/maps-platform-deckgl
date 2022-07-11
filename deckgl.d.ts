import * as DeckTypings from "@danmarshall/deckgl-typings"
import * as GDeckTypings from "@danmarshall/deckgl-typings/deck.gl__google-maps"
declare module "deck.gl" {
    export namespace DeckTypings {}
}
declare module "deck.gl/google-maps" {
    export namespace GDeckTypings {}
}

