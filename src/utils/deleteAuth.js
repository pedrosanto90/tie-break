const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://spszxlphrircmmpnrjxz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwc3p4bHBocmlyY21tcG5yanh6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDU5MTQ5MywiZXhwIjoyMDY2MTY3NDkzfQ.JN1xHPAMYPnKemDeY7SIFbDS0hL0R1RspMiq5jLXQuo",
);

async function deleteUser(userId) {
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) {
    console.error(`Erro ao apagar utilizador ${userId}:`, error);
  } else {
    console.log(`Utilizador ${userId} apagado com sucesso.`);
  }
}

async function main() {
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error("Erro ao listar utilizadores:", error);
    return;
  }

  const users = data.users;

  for (const user of users) {
    if (user.email?.includes("@tiebreak.com")) {
      await deleteUser(user.id);
    }
  }
}

main();
