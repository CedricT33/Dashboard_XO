package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.ObjectifCommerce;
import fr.tressous.cedric.dashboard.appli.repository.ObjectifCommerceRepository;

@Service
public class ObjectifCommerceServiceImpl implements ObjectifCommerceService{
	
	private ObjectifCommerceRepository objectifRepo;
	
	public ObjectifCommerceServiceImpl(ObjectifCommerceRepository objectifRepo) {
		this.objectifRepo = objectifRepo;
	}

	public List<ObjectifCommerce> getAllObjectifsCommerce() {
		return objectifRepo.findAll();
	}
	
	public ObjectifCommerce createNewObjectifCommerce(ObjectifCommerce newObjectifCommerce) {
		return objectifRepo.save(newObjectifCommerce);
	}
	
	public ObjectifCommerce updateObjectifCommerce(ObjectifCommerce objectifCommerce) {
		return objectifRepo.saveAndFlush(objectifCommerce);
	}
	
	public void deleteObjectifCommerce(Long id) {
		objectifRepo.deleteById(id);
	}
}
