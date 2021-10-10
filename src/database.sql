CREATE TABLE `payslip`.`department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `department_code` VARCHAR(20) NULL,
  `department_name` VARCHAR(50) NULL,
  PRIMARY KEY (`id`));

INSERT INTO `payslip`.`department` (`department_code`, `department_name`) VALUES ('HR', 'HR');
INSERT INTO `payslip`.`department` (`department_code`, `department_name`) VALUES ('GA', 'GA');
INSERT INTO `payslip`.`department` (`department_code`, `department_name`) VALUES ('PC', 'PC');
INSERT INTO `payslip`.`department` (`department_code`, `department_name`) VALUES ('SAL', 'SAL');
INSERT INTO `payslip`.`department` (`department_code`, `department_name`) VALUES ('FA', 'FA');
INSERT INTO `payslip`.`department` (`department_code`, `department_name`) VALUES ('QA', 'QA');
INSERT INTO `payslip`.`department` (`department_code`, `department_name`) VALUES ('IT', 'IT');
INSERT INTO `payslip`.`department` (`department_code`, `department_name`) VALUES ('PROD', 'PROD');
INSERT INTO `payslip`.`department` (`department_code`, `department_name`) VALUES ('TEC', 'TEC');

SET SQL_SAFE_UPDATES = 0;
