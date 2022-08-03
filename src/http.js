class Http {
   constructor() {
      this.api = "http://localhost:4000/post";
      this.headers = { "Content-Type": "application/json" };
   }

   async send(method, url, body) {
      const data = await fetch(url, {
         method: method,
         headers: this.headers,
         body: body ? JSON.stringify(body) : undefined,
      }).then((res) =>
         res.json().then((data) => {
            if (!res.ok) {
               throw data.message;
            }
            return data;
         })
      );
      return data;
   }

   async getAllPost() {
      return await this.send("GET", this.api, null);
   }

   async getPostById(id) {
      return await this.send("GET", `${this.api}/${id}`, null);
   }

   async createPost(body) {
      return await this.send("POST", this.api, body);
   }

   async updatePost(id, body) {
      return await this.send("PUT", `${this.api}/${id}`, body);
   }

   async deletePost(id) {
      return await this.send("DELETE", `${this.api}/${id}`, null);
   }
}

export default new Http();
