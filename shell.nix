let
  pkgs = import <nixpkgs> { };
in
pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    pkg-config
    gobject-introspection
    rustup
    cargo
    cargo-tauri
    cargo-xwin
    nodejs
  ];

  buildInputs = with pkgs; [
    at-spi2-atk
    atkmm
    cairo
    gdk-pixbuf
    glib
    gtk3
    harfbuzz
    librsvg
    libsoup_3
    pango
    webkitgtk_4_1
    openssl
    nsis
    lld_18
    libllvm
    libclang
  ];

  # fixes to build windows target in linux: https://v2.tauri.app/distribute/windows-installer/
  # rustup target add x86_64-pc-windows-msvc
}
