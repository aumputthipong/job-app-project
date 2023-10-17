class JobPost {
    constructor(
      id,
      category,
      jobTitle,
      position,
      imageUrl,
      workperiod,
      agency,
      wages,
      welfareBenefits,
      email,
      phone,
      employmentType,
      attributes,
      detail,
    ) {
      this.id = id;
      this.jobTitle = jobTitle;
      this.category = category;
      this.position = position;
      this.imageUrl = imageUrl;
      this.workperiod = workperiod;
      this.agency = agency;
      this.wages = wages;
      this.welfareBenefits = welfareBenefits;
      this.email = email;
      this.phone = phone;
      this.employmentType = employmentType;
      this.attributes =attributes
      this.detail =detail
    }
  }
  
  export default JobPost;
  