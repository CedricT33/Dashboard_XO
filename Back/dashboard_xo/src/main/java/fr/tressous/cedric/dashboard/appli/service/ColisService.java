package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.Colis;

@Service
public interface ColisService {
	
	/**
	 * Method that return a list of packets in the application.
	 * @return the list of packets.
	 */
	public List<Colis> getAllColis();
	
	/**
     * Method that creates a new packet.
     * @param newColis the new packet to create.
     * @return the created packet.
     */
    public Colis createNewColis(Colis newColis);
    
    /**
     * Method that update a packet.
     * @param packet the packet to update.
     */
    public Colis updateColis(Colis colis);
    
    /**
     * Method that delete a packet.
     * @param packet the packet to delete.
     */
    public void deleteColis(Colis colis);
}
