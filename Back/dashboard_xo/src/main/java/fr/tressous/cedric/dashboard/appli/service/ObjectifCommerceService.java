package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.ObjectifCommerce;

@Service
public interface ObjectifCommerceService {
	
	/**
	 * Method that return a list of goals in the application.
	 * @return the list of goals.
	 */
	public List<ObjectifCommerce> getAllObjectifsCommerce();
	
	/**
     * Method that creates a new goal.
     * @param newObjectifCommerce the new goal to create.
     * @return the created goal.
     */
    public ObjectifCommerce createNewObjectifCommerce(ObjectifCommerce newObjectifCommerce);
    
    /**
     * Method that update a new goal.
     * @param objectifCommerce the goal to update.
     * @return the updated goal.
     */
    public ObjectifCommerce updateObjectifCommerce(ObjectifCommerce objectifCommerce);
    
    /**
     * Method that delete a goal.
     * @param id the id of the goal to delete.
     */
    public void deleteObjectifCommerce(Long id);
}
