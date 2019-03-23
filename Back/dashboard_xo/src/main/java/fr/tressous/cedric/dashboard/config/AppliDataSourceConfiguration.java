package fr.tressous.cedric.dashboard.config;

import java.util.HashMap;

import javax.sql.DataSource;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(
		basePackages = "fr.tressous.cedric.dashboard.appli.repository",
		entityManagerFactoryRef = "appliEntityManager",
		transactionManagerRef = "appliTransactionManager"
)
public class AppliDataSourceConfiguration {
	
	
	@Bean
	@Primary
	public LocalContainerEntityManagerFactoryBean appliEntityManager() {
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(primaryDataSource());
		em.setPackagesToScan(new String[] { "fr.tressous.cedric.dashboard.appli.model" });
		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		em.setJpaVendorAdapter(vendorAdapter);
		HashMap<String, Object> properties = new HashMap<String, Object>();
		properties.put("hibernate.hbm2ddl.auto", "update");
		properties.put("hibernate.dialect", "org.hibernate.dialect.H2Dialect");
		em.setJpaPropertyMap(properties);
		return em;
	}
	
	@Bean
	@Primary
	public DataSource primaryDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		 dataSource.setDriverClassName("org.h2.Driver");
		 dataSource.setUrl("jdbc:h2:file:./data/dashboard_xo");
		 dataSource.setUsername("root");
		 dataSource.setPassword("root");
		return dataSource;
	}
	
	@Bean
	@Primary
	public PlatformTransactionManager appliTransactionManager() {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(appliEntityManager().getObject());
		return transactionManager;
	}

}
