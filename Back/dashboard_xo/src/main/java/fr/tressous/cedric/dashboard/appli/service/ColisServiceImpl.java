package fr.tressous.cedric.dashboard.appli.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.tressous.cedric.dashboard.appli.model.Colis;
import fr.tressous.cedric.dashboard.appli.repository.ColisRepository;

@Service
public class ColisServiceImpl implements ColisService{
	
	private ColisRepository colisRepo;
	
	public ColisServiceImpl(ColisRepository colisRepo) {
		this.colisRepo = colisRepo;
	}

	public List<Colis> getAllColis() {
		return colisRepo.findAll();
	}
	
	public Colis createNewColis(Colis newColis) {
		return colisRepo.save(newColis);
	}
	
	public Colis updateColis(Colis colis) {
		return colisRepo.saveAndFlush(colis);
	}
	
	public void deleteColis(Long id) {
		colisRepo.deleteById(id);
	}
}
