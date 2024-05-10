import { Plugin, FileSystemAdapter, TFile, MarkdownView } from "obsidian"

export default abstract class PluginExt<S> extends Plugin {
  settings: S
  async loadSettings(defaultSetting: S) {
    this.settings = Object.assign({}, defaultSetting, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
  
  getBaseFullPath(): string {
    // @ts-ignore
    return this.app.vault.adapter.basePath
  }

  getPluginPath() {
    return this.manifest.dir!
  }

  getPluginFullPath() {
    return (this.app.vault.adapter as FileSystemAdapter).getFullPath(this.getPluginPath())
  }

  async loadFileData<DataOfPath, P extends keyof DataOfPath>(path: P, defaultData: DataOfPath[P]): Promise<DataOfPath[P]> {
    let filePath = [this.getPluginPath(), path].join("/")

    const fileExist = await this.app.vault.adapter.exists(filePath)
    if(!fileExist) {
      await this.writeFileDirectly(filePath, JSON.stringify(defaultData, null, 2))
      return defaultData;
    }

    let data = await this.app.vault.adapter.read(filePath)
    return JSON.parse(data)
  }


  async saveFileData<DataOfPath, P extends keyof DataOfPath>(path: P, data: DataOfPath[P]) {
      let filePath = [this.getPluginPath(), path].join("/")
      await this.app.vault.adapter.write(filePath, JSON.stringify(data, null, 2))
      
  }

  async getFilesRecursively(path: string): Promise<string[]> {
      let res = []
      let {files, folders} = await this.app.vault.adapter.list(path)

      files = files.filter(file => file.endsWith(".md"))
      res.push(...files)

      for(const folder of folders) {
          res.push(...await this.getFilesRecursively(folder))
      }
      
      return res
  }

  /**
   * 如果当前路径的父目录不存在则创建
   * @param normalizedPath
   */
  async checkPath(normalizedPath: string) {
      const parent = normalizedPath.split("/").slice(0, -1).join("/")
      if(!await this.app.vault.adapter.exists(parent)) {
          await this.app.vault.createFolder(parent)
      }
  }

  /**
   * 直接写文件，如果路径上的目录不存在，自动递归创建
   */
  async writeFileDirectly(path: string, content: string) {
      await this.checkPath(path)    
      await this.app.vault.adapter.write(path, content)
  }


    async activateView(viewType: string, side: "left" | "right" | "tab" = "right") {
      // fix console error
      // https://github.com/guopenghui/obsidian-quiet-outline/issues/154
      if (this.app.workspace.rightSplit === null) return;

      if (this.app.workspace.getLeavesOfType(viewType).length === 0) {

        let leaf;

      switch(side) {
        case "left":
          leaf = this.app.workspace.getLeftLeaf(false);
          break;
        case "right":
          leaf = this.app.workspace.getRightLeaf(false);
          break;
        case "tab":
          leaf = this.app.workspace.getLeaf("tab");
          break;
      }

      await leaf?.setViewState({
        type: viewType,
        active: true,
      })
    }

    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(viewType)[0]
    );
  }

  jumpTo(file: TFile, line: number) {
    const leaves = this.app.workspace.getLeavesOfType("markdown");

    const opened = leaves.find(leaf => (leaf.view as MarkdownView).file?.path === file.path);
    if(opened) {
      this.app.workspace.revealLeaf(opened);
      (opened.view as MarkdownView).setEphemeralState({
        line
      });
    } else {
      this.app.workspace.getLeaf("tab").openFile(file, {
        eState: {
          line
        }
      });
    }
  }
}
