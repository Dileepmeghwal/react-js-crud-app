import * as React from "react";

export default function ModelBox({ selectId, open, onClose, handleSave }) {
  const [company, setCompany] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (selectId) {
      setCompany(selectId.company);
      setName(selectId.name);
      setEmail(selectId.email);
    }
  }, [selectId]);
  const saveData = (e) => {
    e.preventDefault();
    handleSave({
      company: company,
      name: name,
      email: email,
    });

    setCompany("");
    setName("");
    setEmail("");
    onClose();
  };
  return (
    <div>
      {open && (
        <div className="custom-model">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Company</label>
              <input
                type="text"
                class="form-control"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Employee Name</label>
              <input
                type="text"
                class="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Employee Name"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Email address</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="form-control"
                placeholder="Email"
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary mt-3 mx-4"
              onClick={saveData}
            >
              {selectId ? "Update" : "Save"}
            </button>
            <button
              type="submit"
              class="btn btn-primary mt-3"
              onClick={onClose}
            >
              cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
