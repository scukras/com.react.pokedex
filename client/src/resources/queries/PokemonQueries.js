export const GetPokemonAll = `
    query {
        pokemon {
            name
            sprites {
            front_default
            }
        }
    }
`;

export const GetOnePokemonDetails = `
    query ($name: String!) {
        pokemon (name: $name) {
            id
            order
            name 
            base_experience
            height
            weight
            types {
              type {
                name
              }
            }
            sprites {
                front_default
            }
            moves {
            move {
                name
                url
            }
            version_group_details {
                level_learned_at
                move_learn_method {
                name
                url
                }
                version_group {
                name
                url
                }
            }
            }
            stats {
                base_stat
                effort
                stat {
                    name
                    url
                }
            }
        }
    }
`;

export const GetPokemonMoveDetails = `
query ($names: [String!]) {
	moves (name: $names) {
    id
    accuracy
    power
    pp
    name
    priority
    type {
      name
    }
  }
}
`;