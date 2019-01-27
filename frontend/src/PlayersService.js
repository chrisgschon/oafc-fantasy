import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class PlayersService{

    constructor(){}


    getPlayers() {
        const url = `${API_URL}/api/players/`;
        return axios.get(url).then(response => response.data);
    }  
    getPlayersByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getPlayer(pk) {
        const url = `${API_URL}/api/player/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deletePlayer(player){
        const url = `${API_URL}/api/players/${player.pk}`;
        return axios.delete(url);
    }
    createPlayer(player){
        const url = `${API_URL}/api/players/`;
        return axios.post(url,player);
    }
    updatePlayer(player){
        const url = `${API_URL}/api/players/${player.pk}`;
        return axios.put(url,player);
    }
}